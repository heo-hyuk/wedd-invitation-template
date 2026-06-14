export interface Person {
  name: string;
  fatherName: string;
  motherName: string;
  phone: string;
}

export interface ContactPerson {
  side: '신랑' | '신부';
  relation: string;
  name: string;
  phone: string;
}

export interface Venue {
  name: string;
  hall: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  directions: {
    subway: string;
    bus: string;
    car: string;
    parking: string;
  };
}

export interface AccountInfo {
  side: '신랑' | '신부';
  relation: string;
  bank: string;
  number: string;
  holder: string;
}

export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  date: string;
}

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'vi';

export type CoverStyle = 'polaroid' | 'typo' | 'fullscreen' | 'minimal' | 'watercolor' | 'botanical' | 'film';

export type TitleFont =
  | 'NanumMyeongjo'
  | 'GowunBatang'
  | 'NotoSerifKR'
  | 'Hahmlet'
  | 'NanumGothic'
  | 'GamjaFlower'
  | 'BlackHanSans'
  | 'Dokdo'
  | 'PoorStory'
  | 'SingleDay'
  | 'CormorantGaramond'
  | 'PlayfairDisplay'
  | 'GreatVibes'
  | 'DancingScript'
  | 'LoveLight'
  | 'Engagement'
  | 'Cinzel'
  | 'LibreBaskerville'
  | 'JosefinSans'
  | 'Italiana'
  | 'BodoniModa';

export type BodyFont =
  | 'NotoSerifKR'
  | 'NanumGothic'
  | 'NanumMyeongjo'
  | 'GowunBatang'
  | 'NanumPenScript'
  | 'LibreBaskerville'
  | 'JosefinSans';

export type TitleFontSize = number;
export type BodyFontSize  = number;

export type IntroEffect = 'flower' | 'rose' | 'snow' | 'star' | 'glitter' | 'none';
export type TextEffect   = 'typing' | 'fadeUp' | 'fadeIn' | 'zoomIn' | 'none';

export interface WeddingDesign {
  coverStyle: CoverStyle;
  titleFont: TitleFont;
  titleFontSize: TitleFontSize;
  bodyFont: BodyFont;
  bodyFontSize: BodyFontSize;
  headingFontSize: number;
  coverSubFontSize: number;
  introEffect: IntroEffect;
  textEffect: TextEffect;
  /** @deprecated use pointColor */
  keyColor?: string;
  bgColor: string;
  textColor: string;
  headingColor?: string;
  pointColor: string;
  subTextColor: string;
}

export const TITLE_FONT_MAP: Record<TitleFont, string> = {
  NanumMyeongjo:    '"Nanum Myeongjo", serif',
  GowunBatang:      '"Gowun Batang", serif',
  NotoSerifKR:      '"Noto Serif KR", serif',
  Hahmlet:          '"Hahmlet", serif',
  NanumGothic:      '"Nanum Gothic", sans-serif',
  GamjaFlower:      '"Gamja Flower", cursive',
  BlackHanSans:     '"Black Han Sans", sans-serif',
  Dokdo:            '"Dokdo", cursive',
  PoorStory:        '"Poor Story", cursive',
  SingleDay:        '"Single Day", cursive',
  CormorantGaramond:'"Cormorant Garamond", serif',
  PlayfairDisplay:  '"Playfair Display", serif',
  GreatVibes:       '"Great Vibes", cursive',
  DancingScript:    '"Dancing Script", cursive',
  LoveLight:        '"Love Light", cursive',
  Engagement:       '"Engagement", cursive',
  Cinzel:           '"Cinzel", serif',
  LibreBaskerville: '"Libre Baskerville", serif',
  JosefinSans:      '"Josefin Sans", sans-serif',
  Italiana:         '"Italiana", serif',
  BodoniModa:       '"Bodoni Moda", serif',
};

export const BODY_FONT_MAP: Record<BodyFont, string> = {
  NotoSerifKR:      '"Noto Serif KR", serif',
  NanumGothic:      '"Nanum Gothic", sans-serif',
  NanumMyeongjo:    '"Nanum Myeongjo", serif',
  GowunBatang:      '"Gowun Batang", serif',
  NanumPenScript:   '"Nanum Pen Script", cursive',
  LibreBaskerville: '"Libre Baskerville", serif',
  JosefinSans:      '"Josefin Sans", sans-serif',
};

export interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: 'cover',       name: '커버',        enabled: true, order: 0 },
  { id: 'greeting',    name: '인사말',      enabled: true, order: 1 },
  { id: 'weddingInfo', name: '예식 안내',   enabled: true, order: 2 },
  { id: 'gallery',     name: '갤러리',      enabled: true, order: 3 },
  { id: 'location',    name: '오시는 길',   enabled: true, order: 4 },
  { id: 'contact',     name: '연락처',      enabled: true, order: 5 },
  { id: 'account',     name: '마음 전하기', enabled: true, order: 6 },
  { id: 'guestbook',   name: '방명록',      enabled: true, order: 7 },
  { id: 'rsvp',        name: '참석 의사',   enabled: true, order: 8 },
];

export const DEFAULT_DESIGN: WeddingDesign = {
  coverStyle:       'polaroid',
  titleFont:        'NanumMyeongjo',
  titleFontSize:    36,
  bodyFont:         'NotoSerifKR',
  bodyFontSize:     15,
  headingFontSize:  16,
  coverSubFontSize: 13,
  introEffect:      'none',
  textEffect:       'fadeUp',
  bgColor:          '#FFF5F5',
  textColor:        '#44403c',
  pointColor:       '#d4a5a5',
  subTextColor:     '#78716c',
};

export interface BgmConfig {
  type: 'preset' | 'upload' | 'none';
  url: string;
  name: string;
  autoPlay: boolean;
  volume: number;
}

export const DEFAULT_BGM: BgmConfig = {
  type: 'none',
  url: '',
  name: '',
  autoPlay: true,
  volume: 50,
};

export interface WeddingConfig {
  groom: Person;
  bride: Person;
  date: string;
  time: string;
  venue: Venue;
  greeting: string;
  coverImage: string;
  gallery: string[];
  accounts: AccountInfo[];
  contacts: ContactPerson[];
  design: WeddingDesign;
  sections?: SectionConfig[];
  language?: Language;
  bgm?: BgmConfig;
}
