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

export function detectExcelEncoding(text: string): boolean {
    return Object.keys(map1).some(artefact => text.includes(artefact));
}

export function fixExcelEncoding(text: string): string {
    for (const [artefact, char] of Object.entries(map1)) {
        text = text.replaceAll(artefact, char);
    }

    return text;
}

export function toExcelUtf8Encoding(text: string): Buffer {
    const utf8 = new TextEncoder().encode(text);
    return Buffer.from(new Uint8Array([0xEF, 0xBB, 0xBF, ...utf8]));
}
