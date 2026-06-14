export interface BgmItem {
  id: string;
  name: string;
  artist: string;
  url: string;
  duration: number;
  mood: 'romantic' | 'elegant' | 'warm' | 'modern' | 'emotional' | 'calm' | 'grand';
}

export const BGM_LIST: BgmItem[] = [
  {
    id: '1',
    name: '봄날의 왈츠',
    artist: '클래식',
    url: 'https://cdn.pixabay.com/audio/2023/09/13/audio_31ee782aee.mp3',
    duration: 187,
    mood: 'romantic',
  },
  {
    id: '2',
    name: '피아노 소나타',
    artist: '클래식',
    url: 'https://cdn.pixabay.com/audio/2023/08/29/audio_82b582586d.mp3',
    duration: 210,
    mood: 'elegant',
  },
  {
    id: '3',
    name: '어쿠스틱 기타',
    artist: '팝',
    url: 'https://cdn.pixabay.com/audio/2020/12/18/audio_67dac84bc6.mp3',
    duration: 195,
    mood: 'warm',
  },
  {
    id: '4',
    name: '재즈 발라드',
    artist: '재즈',
    url: 'https://cdn.pixabay.com/audio/2023/08/25/audio_0d2250aead.mp3',
    duration: 230,
    mood: 'modern',
  },
  {
    id: '5',
    name: '첼로 협주곡',
    artist: '클래식',
    url: 'https://cdn.pixabay.com/audio/2026/06/09/audio_4968a13b9d.mp3',
    duration: 245,
    mood: 'emotional',
  },
  {
    id: '6',
    name: '뉴에이지 피아노',
    artist: '뉴에이지',
    url: 'https://cdn.pixabay.com/audio/2025/09/25/audio_a4d6104877.mp3',
    duration: 180,
    mood: 'calm',
  },
  {
    id: '7',
    name: '오케스트라 왈츠',
    artist: '클래식',
    url: 'https://cdn.pixabay.com/audio/2021/09/12/audio_b9acf8d810.mp3',
    duration: 265,
    mood: 'grand',
  },
  {
    id: '8',
    name: '보사노바',
    artist: '재즈',
    url: 'https://cdn.pixabay.com/audio/2025/10/10/audio_60e9e89f3f.mp3',
    duration: 198,
    mood: 'romantic',
  },
  {
    id: '9',
    name: '어쿠스틱 팝',
    artist: '팝',
    url: 'https://cdn.pixabay.com/audio/2026/06/04/audio_dcecbed7fb.mp3',
    duration: 212,
    mood: 'warm',
  },
  {
    id: '10',
    name: '피아노 발라드',
    artist: '발라드',
    url: 'https://cdn.pixabay.com/audio/2026/06/09/audio_20e712008f.mp3',
    duration: 225,
    mood: 'emotional',
  },
];
