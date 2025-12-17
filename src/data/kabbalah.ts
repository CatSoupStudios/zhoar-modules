export type KabbalahSchool = 'gd' | 'ari' | 'ort' | 'akashic';

export interface HebrewCharData {
  val: number;
  name: string;
  palettes: Record<KabbalahSchool, string>;
}

export const KABBALAH_SCHOOLS: { id: KabbalahSchool; name: string; icon: string }[] = [
  { id: 'ort', name: 'Ortodoxa', icon: 'bookOutline' },
  { id: 'ari', name: 'Ari Z"L', icon: 'flameOutline' },
  { id: 'gd', name: 'Golden Dawn', icon: 'eyeOutline' },
  { id: 'akashic', name: 'Akashic', icon: 'sparklesOutline' },
];

export const HEBREW_DATA: Record<string, HebrewCharData> = {
  'א': { val: 1, name: 'Aleph', palettes: { gd: 'rgb(240, 248, 255)', ari: 'rgb(255, 255, 255)', ort: 'rgb(200, 200, 200)', akashic: 'rgb(173, 255, 47)' } },
  'ב': { val: 2, name: 'Bet', palettes: { gd: 'rgb(255, 255, 240)', ari: 'rgb(255, 255, 255)', ort: 'rgb(50, 50, 50)', akashic: 'rgb(0, 0, 205)' } },
  'ג': { val: 3, name: 'Gimel', palettes: { gd: 'rgb(255, 140, 0)', ari: 'rgb(220, 20, 60)', ort: 'rgb(255, 0, 0)', akashic: 'rgb(228, 0, 124)' } },
  'ד': { val: 4, name: 'Dalet', palettes: { gd: 'rgb(255, 215, 0)', ari: 'rgb(0, 128, 0)', ort: 'rgb(255, 165, 0)', akashic: 'rgb(149, 53, 83)' } },
  'ה': { val: 5, name: 'Hei', palettes: { gd: 'rgb(255, 69, 0)', ari: 'rgb(0, 0, 139)', ort: 'rgb(139, 0, 0)', akashic: 'rgb(135, 206, 235)' } },
  'ו': { val: 6, name: 'Vav', palettes: { gd: 'rgb(139, 69, 19)', ari: 'rgb(255, 255, 255)', ort: 'rgb(100, 50, 0)', akashic: 'rgb(220, 20, 60)' } },
  'ז': { val: 7, name: 'Zayin', palettes: { gd: 'rgb(255, 255, 0)', ari: 'rgb(255, 140, 0)', ort: 'rgb(192, 192, 192)', akashic: 'rgb(65, 105, 225)' } },
  'ח': { val: 8, name: 'Chet', palettes: { gd: 'rgb(0, 191, 255)', ari: 'rgb(128, 0, 0)', ort: 'rgb(0, 0, 128)', akashic: 'rgb(255, 215, 0)' } },
  'ט': { val: 9, name: 'Tet', palettes: { gd: 'rgb(255, 165, 0)', ari: 'rgb(255, 255, 255)', ort: 'rgb(255, 215, 0)', akashic: 'rgb(200, 162, 200)' } },
  'י': { val: 10, name: 'Yod', palettes: { gd: 'rgb(85, 107, 47)', ari: 'rgb(0, 0, 0)', ort: 'rgb(10, 10, 10)', akashic: 'rgb(255, 248, 220)' } },
  'כ': { val: 20, name: 'Kaf', palettes: { gd: 'rgb(0, 128, 0)', ari: 'rgb(0, 255, 0)', ort: 'rgb(139, 69, 19)', akashic: 'rgb(138, 43, 226)' } },
  'ל': { val: 30, name: 'Lamed', palettes: { gd: 'rgb(173, 216, 230)', ari: 'rgb(255, 255, 0)', ort: 'rgb(200, 200, 255)', akashic: 'rgb(204, 119, 34)' } },
  'מ': { val: 40, name: 'Mem', palettes: { gd: 'rgb(0, 0, 205)', ari: 'rgb(0, 0, 255)', ort: 'rgb(0, 100, 255)', akashic: 'rgb(0, 206, 209)' } },
  'נ': { val: 50, name: 'Nun', palettes: { gd: 'rgb(0, 128, 128)', ari: 'rgb(0, 100, 0)', ort: 'rgb(47, 79, 79)', akashic: 'rgb(255, 182, 193)' } },
  'ס': { val: 60, name: 'Samekh', palettes: { gd: 'rgb(250, 128, 114)', ari: 'rgb(255, 0, 255)', ort: 'rgb(255, 69, 0)', akashic: 'rgb(218, 112, 214)' } },
  'ע': { val: 70, name: 'Ayin', palettes: { gd: 'rgb(47, 79, 79)', ari: 'rgb(75, 0, 130)', ort: 'rgb(0, 0, 0)', akashic: 'rgb(80, 200, 120)' } },
  'פ': { val: 80, name: 'Pei', palettes: { gd: 'rgb(148, 0, 211)', ari: 'rgb(255, 255, 255)', ort: 'rgb(255, 0, 0)', akashic: 'rgb(255, 105, 180)' } },
  'צ': { val: 90, name: 'Tzadik', palettes: { gd: 'rgb(224, 255, 255)', ari: 'rgb(128, 0, 128)', ort: 'rgb(0, 255, 255)', akashic: 'rgb(144, 238, 144)' } },
  'ק': { val: 100, name: 'Kof', palettes: { gd: 'rgb(70, 130, 180)', ari: 'rgb(220, 20, 60)', ort: 'rgb(100, 100, 100)', akashic: 'rgb(175, 238, 238)' } },
  'ר': { val: 200, name: 'Resh', palettes: { gd: 'rgb(105, 105, 105)', ari: 'rgb(255, 165, 0)', ort: 'rgb(139, 69, 19)', akashic: 'rgb(230, 230, 250)' } },
  'ש': { val: 300, name: 'Shin', palettes: { gd: 'rgb(220, 20, 60)', ari: 'rgb(255, 0, 0)', ort: 'rgb(255, 69, 0)', akashic: 'rgb(224, 255, 255)' } },
  'ת': { val: 400, name: 'Tav', palettes: { gd: 'rgb(75, 0, 130)', ari: 'rgb(0, 0, 139)', ort: 'rgb(0, 0, 0)', akashic: 'rgb(255, 255, 224)' } }
};

export const NORMALIZE_MAP: Record<string, string> = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };

// ESTO ARREGLA EL ERROR DE "ANY" EN EL TECLADO Y CREA EL ARRAY ORDENADO
export const HEBREW_ALPHABET = Object.keys(HEBREW_DATA).map(char => ({
  char, ...HEBREW_DATA[char]
}));

export const getHebrewColor = (char: string, school: KabbalahSchool): string => {
  const normalizedChar = NORMALIZE_MAP[char] || char;
  const data = HEBREW_DATA[normalizedChar];
  if (!data) return '#888888';
  return data.palettes[school];
};