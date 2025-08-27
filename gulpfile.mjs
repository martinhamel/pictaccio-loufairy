import closureCompiler from 'google-closure-compiler';
import gulp from 'gulp';
import gulpConcat from 'gulp-concat';
import gulpClean from 'gulp-clean';
import gulpTypescript from 'gulp-typescript';
import { dirname, relative } from 'path';
import { Transform } from 'stream';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cjsProject = gulpTypescript.createProject('./tsconfig.cjs.json');
const umdProject = gulpTypescript.createProject('./tsconfig.umd.json');
const bundleProject = gulpTypescript.createProject('./tsconfig.bundle.json');
const dirs = {
    in: {
        dist: ['./dist/*'],
        src: './src/**/*',
        umd: './dist/umd/**/*.js'
    },
    out: {
        cjs: './dist/cjs/',
        dist: './dist/',
        umd: './dist/umd/',
        bundle: './dist/bundle/'
    }
}
const REQUIRE_DEPS_CAPTURE = /require\(['"](?<dep>[a-z0-9_-]+)['"]\)/gmi;


/* COMMON FUNCTIONS */
function cleanOutDir() {
    return gulp.src(dirs.in.dist)
        .pipe(gulpClean());
}


/* COMPILE FUNCTIONS */
function bundleCompile() {
    return gulp.src([
        'node_modules/decode-uri-component/index.js',
        'node_modules/filter-obj/index.js',
        'node_modules/split-on-first/index.js',
        'node_modules/strict-uri-encode/index.js',
        'node_modules/query-string/index.js'])
        .pipe(new Transform({
            objectMode: true,
            transform(object, encoding, callback) {
                if (object.contents) {
                    const contents = object.contents.toString().replaceAll('module.exports', 'exports');
                    const deps = [];
                    const pathChar = object._base.lastIndexOf('/') !== -1
                        ? '/'
                        : '\\';
                    for (const result of contents.matchAll(REQUIRE_DEPS_CAPTURE)) {
                        deps.push(result.groups.dep);
                    }
                    object.contents = Buffer.from(
`define('${object._base.substr(object._base.lastIndexOf(pathChar) + 1)}',
["require", "exports"${deps.length ? `, "${deps.join('", "')}"` : ''}], function (require, exports) {
${contents}
});`
                    )
                }
                callback(null, object);
            },
        }))
        .pipe(
            gulp.src(dirs.in.umd)
        )
        .pipe(new Transform({
            objectMode: true,
            transform(object, encoding, callback) {
                if (object.contents) {
                    object.contents = Buffer.from(
                        `(function() {
${object.contents.toString()}
})();`
                    )
                }
                callback(null, object);
            },
        }))
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulp.dest(dirs.out.bundle));
}

function cjsCompile() {
    return gulp.src(dirs.in.src)
        .pipe(cjsProject())
        .pipe(gulp.dest(dirs.out.cjs));
}

function umdCompile() {
    return gulp.src(dirs.in.src)
        .pipe(umdProject())
        .pipe(new Transform({
            objectMode: true,
            transform(object, encoding, callback) {
                if (object.contents) {
                    let contents = object.contents.toString();
                    let packageName = object.history[object.history.length - 1];

                    for (const match of contents.matchAll(/define\(\[(.*)]/g)) {
                        const processPackageLocal = (dependency) => {
                            if (dependency.includes('/')) {
                                if (dependency.startsWith('.')) {
                                    dependency = dependency.slice(1);
                                }
                                if (!dependency.startsWith('/')) {
                                    dependency = `/${dependency}`;
                                }
                                dependency = `@loufa${dependency}`;
                            }

                            return dependency;
                        }
                        const dependencies = match[1]
                            .split(',')
                            .map(d => d.trim().replaceAll(/"/g, ''))
                            .map(processPackageLocal);
                        contents = contents
                            .replaceAll(/define\(\[(.*)]/g, `define([${dependencies.map(d => `"${d}"`).join(', ')}]`);
                    }

                    if (object.history[0].endsWith('umd/entry.js')) {
                        packageName = '@loufa/loufairy';
                    } else {
                        const pathChar = object._base.lastIndexOf('/') !== -1
                            ? '/'
                            : '\\';

                        if (packageName.endsWith(pathChar + 'index.js')) {
                            packageName = packageName.slice(0, -9);
                        }
                        if (packageName.endsWith('.js')) {
                            packageName = packageName.slice(0, -3);
                        }
                        packageName = '@loufa/' + packageName.substr(__dirname.length + 10).replaceAll('\\', '/');
                    }

                    object.contents = Buffer.from(
                        contents
                            .replaceAll(/define\(/g, `define("${packageName}", `)
                    );
                }
                callback(null, object);
            },
        }))
        .pipe(gulp.dest(dirs.out.umd));
}


/* EXPORTS */
export const compile = gulp.series([
    cleanOutDir,
    umdCompile,
    bundleCompile
]);
