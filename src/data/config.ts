import type { WeddingConfig } from '../types/wedding';
import { DEFAULT_DESIGN, DEFAULT_SECTIONS, DEFAULT_BGM } from '../types/wedding';

export const config: WeddingConfig = {
  groom: {
    name: '김진호',
    fatherName: '김태형',
    motherName: '박선영',
    phone: '010-0000-0000',
  },
  bride: {
    name: '이나은',
    fatherName: '이준혁',
    motherName: '최미래',
    phone: '010-0000-0000',
  },
  date: '2025-10-24',
  time: '13:30',
  venue: {
    name: '더채플앳청담',
    hall: '그랜드홀 3층',
    address: '서울특별시 강남구 청담동 000-00',
    phone: '',
    lat: 37.5247,
    lng: 127.0511,
    directions: {
      subway: '7호선 청담역 1번 출구에서 도보 5분',
      bus: '강남구청 방면 버스 이용 후 청담사거리 하차',
      car: '서울특별시 강남구 청담동 000-00 더채플앳청담 방면',
      parking: '건물 내 지하주차장 2시간 무료 (주차권 프론트 수령)',
    },
  },
  greeting: `서로가 서로에게 가장 큰 선물임을 알게 된\n두 사람이 이제 하나가 되려 합니다.\n바쁘신 중에도 저희의 소중한 날을 함께\n축복해 주시면 감사하겠습니다.`,
  coverImage: 'https://picsum.photos/seed/wedding-cover/600/900',
  gallery: [
    'https://picsum.photos/seed/wedding1/600/800',
    'https://picsum.photos/seed/wedding2/600/800',
    'https://picsum.photos/seed/wedding3/600/800',
    'https://picsum.photos/seed/wedding4/600/800',
    'https://picsum.photos/seed/wedding5/600/800',
    'https://picsum.photos/seed/wedding6/600/800',
  ],
  accounts: [
    { side: '신랑', relation: '신랑',      bank: '카카오뱅크', number: '000-00-0000000',   holder: '김진호' },
    { side: '신랑', relation: '신랑 아버지', bank: '국민은행',   number: '000000-00-000000', holder: '김태형' },
    { side: '신랑', relation: '신랑 어머니', bank: '신한은행',   number: '000-000-000000',   holder: '박선영' },
    { side: '신부', relation: '신부',      bank: '토스뱅크',   number: '000-0000-0000',    holder: '이나은' },
    { side: '신부', relation: '신부 아버지', bank: '우리은행',   number: '0000-000-000000',  holder: '이준혁' },
    { side: '신부', relation: '신부 어머니', bank: '하나은행',   number: '000-0000-0000',    holder: '최미래' },
  ],
  contacts: [
    { side: '신랑', relation: '신랑',  name: '김진호', phone: '010-0000-0000' },
    { side: '신랑', relation: '아버지', name: '김태형', phone: '010-0000-0000' },
    { side: '신랑', relation: '어머니', name: '박선영', phone: '010-0000-0000' },
    { side: '신부', relation: '신부',  name: '이나은', phone: '010-0000-0000' },
    { side: '신부', relation: '아버지', name: '이준혁', phone: '010-0000-0000' },
    { side: '신부', relation: '어머니', name: '최미래', phone: '010-0000-0000' },
  ],
  design: { ...DEFAULT_DESIGN },
  sections: DEFAULT_SECTIONS.map(s => ({ ...s })),
  language: 'ko' as const,
  bgm: { ...DEFAULT_BGM, type: 'preset', url: '', name: '봄날의 왈츠' },
};
