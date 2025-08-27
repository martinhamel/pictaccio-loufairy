"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toExcelUtf8Encoding = exports.fixExcelEncoding = exports.detectExcelEncoding = void 0;
const map1 = {
    '√©': 'é',
    '√°': 'á',
    '√≠': 'í',
    '√≥': 'ó',
    '√∂': 'ö',
    '√º': 'ü',
    '√¥': 'ô',
    '√®': 'è',
    '√ß': 'ç',
    '√±': 'ñ',
    '√∏': 'ø',
    '√´': 'ë',
    '√§': 'ä',
    '√•': 'å',
    '√Å': 'Á',
    '√∫': 'ú',
    '√ª': 'û',
    '√Ø': 'ï',
    '√â': 'É',
    '√†': 'à',
    '√¶': 'æ',
    '√Æ': 'î',
    '√¢': 'â',
    '√£': 'ã',
    '√î': 'Ô',
    '√ü': 'ß',
    '√ì': 'Ó',
    '√≤': 'ò',
    '√Ω': 'ý',
    '√ñ': 'Ö',
    '√™': 'ê',
    '√Ä': 'À',
    '√ò': 'Ø',
    '√Ö': 'Å',
    '√∞': 'ð',
    '√á': 'Ç',
    '√Ç': 'Â',
    '√π': 'ù',
    '√í': 'Ò',
    '√¨': 'ì',
    '√ú': 'Ü',
    '√à': 'È',
    '√û': 'Þ'
};
function detectExcelEncoding(text) {
    return Object.keys(map1).some(artefact => text.includes(artefact));
}
exports.detectExcelEncoding = detectExcelEncoding;
function fixExcelEncoding(text) {
    for (const [artefact, char] of Object.entries(map1)) {
        text = text.replaceAll(artefact, char);
    }
    return text;
}
exports.fixExcelEncoding = fixExcelEncoding;
function toExcelUtf8Encoding(text) {
    const utf8 = new TextEncoder().encode(text);
    return Buffer.from(new Uint8Array([0xEF, 0xBB, 0xBF, ...utf8]));
}
exports.toExcelUtf8Encoding = toExcelUtf8Encoding;
//# sourceMappingURL=excel_encoding.js.map