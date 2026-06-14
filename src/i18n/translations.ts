import type { Language } from '../types/wedding';

export interface Translations {
  editor: {
    groomSide: string;
    brideSide: string;
    weddingInfoSection: string;
    groomName: string;
    brideName: string;
    father: string;
    mother: string;
    date: string;
    time: string;
    timePlaceholder: string;
    venueSearch: string;
    venueName: string;
    hall: string;
    address: string;
    coordsAuto: string;
    greeting: string;
    greetingLabel: string;
    transport: string;
    dirSubway: (name: string) => string;
    dirBus: (name: string, district: string) => string;
    dirCar: (name: string, addr: string) => string;
    dirParking: (name: string) => string;
    venueUpdated: string;
    venueUpdatedNote: string;
  };
  cover: {
    subtitle: string;
    tagline: string;
    scroll: string;
  };
  sections: {
    greeting: string;
    weddingInfo: string;
    gallery: string;
    location: string;
    contact: string;
    account: string;
    guestbook: string;
    rsvp: string;
  };
  greeting: {
    groomSide: string;
    brideSide: string;
    formatGroomLineage: (father: string, mother: string, name: string) => string;
    formatBrideLineage: (father: string, mother: string, name: string) => string;
  };
  weddingInfo: {
    formatDate: (year: number, month: number, day: number, weekdayIdx: number) => string;
    formatShortDate: (year: number, month: number, day: number) => string;
    formatTime: (time: string) => string;
  };
  location: {
    subway: string;
    bus: string;
    car: string;
    parking: string;
    copy: string;
    copied: string;
    naverMap: string;
    kakaoMap: string;
    googleMap: string;
  };
  contact: {
    groom: string;
    bride: string;
  };
  account: {
    groom: string;
    bride: string;
    copy: string;
    copied: string;
    copyToast: string;
  };
  guestbook: {
    namePlaceholder: string;
    passwordPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    submitted: string;
    submitting: string;
    empty: string;
    deleteTitle: string;
    deleteDesc: (name: string) => string;
    deletePasswordPlaceholder: string;
    deletePasswordRequired: string;
    deleteError: string;
    deleteCancel: string;
    deleteConfirm: string;
  };
  rsvp: {
    nameLabel: string;
    namePlaceholder: string;
    attendanceLabel: string;
    yes: string;
    no: string;
    countLabel: string;
    count1: string;
    count2: string;
    count3: string;
    mealLabel: string;
    mealYes: string;
    mealNo: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successSub: string;
  };
}

export const translations: Record<Language, Translations> = {
  ko: {
    editor: {
      groomSide: '신랑 측',
      brideSide: '신부 측',
      weddingInfoSection: '예식 정보',
      groomName: '신랑 이름',
      brideName: '신부 이름',
      father: '아버지',
      mother: '어머니',
      date: '예식 날짜',
      time: '예식 시간',
      timePlaceholder: '오후 1시 30분',
      venueSearch: '예식장 검색',
      venueName: '예식장 이름',
      hall: '홀 / 층',
      address: '주소',
      coordsAuto: '자동 입력됨',
      greeting: '인사말',
      greetingLabel: '인사말 텍스트',
      transport: '교통 안내',
      dirSubway: (name) => `${name} 인근 지하철역에서 도보 이용\n(구체적인 노선 및 출구 번호를 입력해주세요)`,
      dirBus: (name, district) => `${district ? district + ' 방면 ' : ''}${name} 인근 버스 정류장 하차\n(버스 번호를 입력해주세요)`,
      dirCar: (name, addr) => `내비게이션 목적지: ${name}\n${addr}`,
      dirParking: (name) => `${name} 주차장 이용 가능\n(주차 가능 시간 및 요금은 예식장에 문의해주세요)`,
      venueUpdated: '예식장 정보가 업데이트됐어요.',
      venueUpdatedNote: '교통안내 탭에서 내용을 확인하고 수정해주세요.',
    },
    cover: {
      subtitle: 'Wedding Invitation',
      tagline: 'We Are Getting Married',
      scroll: 'scroll',
    },
    sections: {
      greeting: '인사말',
      weddingInfo: '예식 안내',
      gallery: '갤러리',
      location: '오시는 길',
      contact: '연락처',
      account: '마음 전하기',
      guestbook: '방명록',
      rsvp: '참석 의사',
    },
    greeting: {
      groomSide: '신랑 측',
      brideSide: '신부 측',
      formatGroomLineage: (f, m, n) => `${f} · ${m}의 아들 ${n}`,
      formatBrideLineage: (f, m, n) => `${f} · ${m}의 딸 ${n}`,
    },
    weddingInfo: {
      formatDate: (y, m, d, wi) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return `${y}년 ${m}월 ${d}일 ${days[wi]}요일`;
      },
      formatShortDate: (y, m, d) => `${y}년 ${m}월 ${d}일`,
      formatTime: (t) => {
        const r = t.match(/^(\d{1,2}):(\d{2})$/);
        if (!r) return t;
        const h = parseInt(r[1]), min = parseInt(r[2]);
        const period = h < 12 ? '오전' : '오후';
        const h12 = h % 12 || 12;
        return min === 0 ? `${period} ${h12}시` : `${period} ${h12}시 ${min}분`;
      },
    },
    location: {
      subway: '지하철', bus: '버스', car: '자가용', parking: '주차',
      copy: '복사', copied: '복사됨 ✓',
      naverMap: '네이버지도', kakaoMap: '카카오맵', googleMap: '구글지도',
    },
    contact: { groom: '신랑 측', bride: '신부 측' },
    account: {
      groom: '신랑 측', bride: '신부 측',
      copy: '복사', copied: '복사됨 ✓', copyToast: '복사되었습니다',
    },
    guestbook: {
      namePlaceholder: '이름',
      passwordPlaceholder: '비밀번호',
      messagePlaceholder: '축하 메시지를 남겨주세요 (최대 100자)',
      submit: '남기기', submitted: '등록됨 ✓', submitting: '저장 중…',
      empty: '아직 방명록이 없습니다.',
      deleteTitle: '삭제 확인',
      deleteDesc: (name) => `${name}님의 글을 삭제합니다.`,
      deletePasswordPlaceholder: '등록 시 입력한 비밀번호',
      deletePasswordRequired: '비밀번호를 입력해주세요.',
      deleteError: '비밀번호가 일치하지 않습니다.',
      deleteCancel: '취소', deleteConfirm: '삭제',
    },
    rsvp: {
      nameLabel: '이름', namePlaceholder: '성함을 입력해주세요',
      attendanceLabel: '참석 여부', yes: '참석', no: '불참',
      countLabel: '참석 인원', count1: '1명', count2: '2명', count3: '3명 이상',
      mealLabel: '식사 여부', mealYes: '할게요', mealNo: '안 할게요',
      messageLabel: '전달 메시지 (선택)',
      messagePlaceholder: '축하 메시지나 전달 사항을 남겨주세요',
      submit: '전달하기', submitting: '전달 중…',
      successTitle: '참석 의사가 전달되었습니다.',
      successSub: '소중한 회신 감사합니다 ♡',
    },
  },

  en: {
    editor: {
      groomSide: 'Groom',
      brideSide: 'Bride',
      weddingInfoSection: 'Ceremony Info',
      groomName: "Groom's Name",
      brideName: "Bride's Name",
      father: 'Father',
      mother: 'Mother',
      date: 'Wedding Date',
      time: 'Time',
      timePlaceholder: '1:30 PM',
      venueSearch: 'Search Venue',
      venueName: 'Venue Name',
      hall: 'Hall / Floor',
      address: 'Address',
      coordsAuto: 'Auto-filled',
      greeting: 'Message',
      greetingLabel: 'Invitation Message',
      transport: 'Directions',
      dirSubway: (name) => `Walk from a nearby subway station to ${name}\n(Add specific line and exit number)`,
      dirBus: (name, district) => `Take bus to stop near ${name}${district ? ' (' + district + ')' : ''}\n(Add bus numbers)`,
      dirCar: (name, addr) => `Navigate to: ${name}\n${addr}`,
      dirParking: (name) => `Parking available at ${name}\n(Contact venue for hours and fees)`,
      venueUpdated: 'Venue info has been updated.',
      venueUpdatedNote: 'Check and edit details in the Directions tab.',
    },
    cover: {
      subtitle: 'Wedding Invitation',
      tagline: 'We Are Getting Married',
      scroll: 'scroll',
    },
    sections: {
      greeting: 'Message',
      weddingInfo: 'Ceremony',
      gallery: 'Gallery',
      location: 'Location',
      contact: 'Contact',
      account: 'Gift',
      guestbook: 'Guestbook',
      rsvp: 'RSVP',
    },
    greeting: {
      groomSide: "Groom's",
      brideSide: "Bride's",
      formatGroomLineage: (f, m, n) => `${n}, son of ${f} & ${m}`,
      formatBrideLineage: (f, m, n) => `${n}, daughter of ${f} & ${m}`,
    },
    weddingInfo: {
      formatDate: (y, m, d, wi) => {
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return `${days[wi]}, ${months[m - 1]} ${d}, ${y}`;
      },
      formatShortDate: (y, m, d) => {
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return `${months[m - 1]} ${d}, ${y}`;
      },
      formatTime: (t) => {
        const r = t.match(/^(\d{1,2}):(\d{2})$/);
        if (!r) return t;
        const h = parseInt(r[1]), min = parseInt(r[2]);
        const period = h < 12 ? 'AM' : 'PM';
        const h12 = h % 12 || 12;
        return `${h12}:${String(min).padStart(2,'0')} ${period}`;
      },
    },
    location: {
      subway: 'Subway', bus: 'Bus', car: 'Driving', parking: 'Parking',
      copy: 'Copy', copied: 'Copied ✓',
      naverMap: 'Naver Map', kakaoMap: 'Kakao Map', googleMap: 'Google Maps',
    },
    contact: { groom: "Groom's", bride: "Bride's" },
    account: {
      groom: "Groom's", bride: "Bride's",
      copy: 'Copy', copied: 'Copied ✓', copyToast: 'Copied!',
    },
    guestbook: {
      namePlaceholder: 'Name',
      passwordPlaceholder: 'Password',
      messagePlaceholder: 'Leave a congratulatory message (max 100 chars)',
      submit: 'Post', submitted: 'Posted ✓', submitting: 'Saving…',
      empty: 'No messages yet.',
      deleteTitle: 'Delete Message',
      deleteDesc: (name) => `Delete ${name}'s message.`,
      deletePasswordPlaceholder: 'Enter your password',
      deletePasswordRequired: 'Please enter your password.',
      deleteError: 'Incorrect password.',
      deleteCancel: 'Cancel', deleteConfirm: 'Delete',
    },
    rsvp: {
      nameLabel: 'Name', namePlaceholder: 'Your name',
      attendanceLabel: 'Attendance', yes: 'Attending', no: 'Decline',
      countLabel: 'Guest Count', count1: '1', count2: '2', count3: '3+',
      mealLabel: 'Meal', mealYes: 'Yes', mealNo: 'No',
      messageLabel: 'Message (optional)',
      messagePlaceholder: 'Leave a message or special requests',
      submit: 'Submit', submitting: 'Sending…',
      successTitle: 'Your RSVP has been received.',
      successSub: 'Thank you for your reply ♡',
    },
  },

  ja: {
    editor: {
      groomSide: '新郎側',
      brideSide: '新婦側',
      weddingInfoSection: '式の情報',
      groomName: '新郎のお名前',
      brideName: '新婦のお名前',
      father: 'お父様',
      mother: 'お母様',
      date: '挙式日',
      time: '挙式時刻',
      timePlaceholder: '午後1時30分',
      venueSearch: '式場を検索',
      venueName: '式場名',
      hall: 'ホール / フロア',
      address: '住所',
      coordsAuto: '自動入力済',
      greeting: 'ご挨拶',
      greetingLabel: 'ご挨拶文',
      transport: '交通案内',
      dirSubway: (name) => `${name}近くの駅から徒歩\n（具体的な路線・出口番号を入力してください）`,
      dirBus: (name, district) => `${district ? district + '方面 ' : ''}${name}近くのバス停で下車\n（バス番号を入力してください）`,
      dirCar: (name, addr) => `ナビ目的地：${name}\n${addr}`,
      dirParking: (name) => `${name}に駐車場あり\n（駐車時間・料金は式場にお問い合わせください）`,
      venueUpdated: '式場情報が更新されました。',
      venueUpdatedNote: '交通案内タブで確認・修正してください。',
    },
    cover: {
      subtitle: 'ご結婚おめでとうございます',
      tagline: '結婚式にご招待します',
      scroll: 'スクロール',
    },
    sections: {
      greeting: 'ご挨拶',
      weddingInfo: '式のご案内',
      gallery: 'ギャラリー',
      location: 'アクセス',
      contact: '連絡先',
      account: 'ご祝儀',
      guestbook: 'メッセージ',
      rsvp: '出欠確認',
    },
    greeting: {
      groomSide: '新郎側',
      brideSide: '新婦側',
      formatGroomLineage: (f, m, n) => `${f} · ${m}の長男 ${n}`,
      formatBrideLineage: (f, m, n) => `${f} · ${m}の長女 ${n}`,
    },
    weddingInfo: {
      formatDate: (y, m, d, wi) => {
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        return `${y}年${m}月${d}日（${days[wi]}）`;
      },
      formatShortDate: (y, m, d) => `${y}年${m}月${d}日`,
      formatTime: (t) => {
        const r = t.match(/^(\d{1,2}):(\d{2})$/);
        if (!r) return t;
        const h = parseInt(r[1]), min = parseInt(r[2]);
        const period = h < 12 ? '午前' : '午後';
        const h12 = h % 12 || 12;
        return min === 0 ? `${period}${h12}時` : `${period}${h12}時${min}分`;
      },
    },
    location: {
      subway: '地下鉄', bus: 'バス', car: 'お車', parking: '駐車場',
      copy: 'コピー', copied: 'コピー済 ✓',
      naverMap: 'Naver Map', kakaoMap: 'Kakao Map', googleMap: 'Google Maps',
    },
    contact: { groom: '新郎側', bride: '新婦側' },
    account: {
      groom: '新郎側', bride: '新婦側',
      copy: 'コピー', copied: 'コピー済 ✓', copyToast: 'コピーしました',
    },
    guestbook: {
      namePlaceholder: 'お名前',
      passwordPlaceholder: 'パスワード',
      messagePlaceholder: 'お祝いメッセージをどうぞ（100字以内）',
      submit: '送信', submitted: '送信済 ✓', submitting: '送信中…',
      empty: 'まだメッセージがありません。',
      deleteTitle: '削除確認',
      deleteDesc: (name) => `${name}さんのメッセージを削除します。`,
      deletePasswordPlaceholder: '登録時のパスワード',
      deletePasswordRequired: 'パスワードを入力してください。',
      deleteError: 'パスワードが一致しません。',
      deleteCancel: 'キャンセル', deleteConfirm: '削除',
    },
    rsvp: {
      nameLabel: 'お名前', namePlaceholder: 'お名前をご入力ください',
      attendanceLabel: 'ご出席', yes: '出席', no: '欠席',
      countLabel: '参加人数', count1: '1名', count2: '2名', count3: '3名以上',
      mealLabel: 'お食事', mealYes: 'いただきます', mealNo: '遠慮します',
      messageLabel: 'メッセージ（任意）',
      messagePlaceholder: 'メッセージをどうぞ',
      submit: '送信', submitting: '送信中…',
      successTitle: 'ご出欠を受け付けました。',
      successSub: 'ご返信ありがとうございます ♡',
    },
  },

  zh: {
    editor: {
      groomSide: '新郎方',
      brideSide: '新娘方',
      weddingInfoSection: '婚礼信息',
      groomName: '新郎姓名',
      brideName: '新娘姓名',
      father: '父亲',
      mother: '母亲',
      date: '婚礼日期',
      time: '婚礼时间',
      timePlaceholder: '下午1:30',
      venueSearch: '搜索场地',
      venueName: '场地名称',
      hall: '厅 / 楼层',
      address: '地址',
      coordsAuto: '已自动填写',
      greeting: '致辞',
      greetingLabel: '邀请函内容',
      transport: '交通指南',
      dirSubway: (name) => `从${name}附近地铁站步行\n（请填写具体线路及出口号）`,
      dirBus: (name, district) => `乘公交至${name}${district ? '（' + district + '）' : ''}附近站台\n（请填写公交线路号）`,
      dirCar: (name, addr) => `导航目的地：${name}\n${addr}`,
      dirParking: (name) => `${name}设有停车场\n（停车时间及费用请联系场地）`,
      venueUpdated: '场地信息已更新。',
      venueUpdatedNote: '请在交通指南标签中查看和修改。',
    },
    cover: {
      subtitle: '婚礼邀请',
      tagline: '我们即将步入婚姻殿堂',
      scroll: '滑动',
    },
    sections: {
      greeting: '致辞',
      weddingInfo: '婚礼详情',
      gallery: '相册',
      location: '交通指南',
      contact: '联系方式',
      account: '随礼',
      guestbook: '留言板',
      rsvp: '出席确认',
    },
    greeting: {
      groomSide: '新郎方',
      brideSide: '新娘方',
      formatGroomLineage: (f, m, n) => `${f} · ${m}之子 ${n}`,
      formatBrideLineage: (f, m, n) => `${f} · ${m}之女 ${n}`,
    },
    weddingInfo: {
      formatDate: (y, m, d, wi) => {
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return `${y}年${m}月${d}日 ${days[wi]}`;
      },
      formatShortDate: (y, m, d) => `${y}年${m}月${d}日`,
      formatTime: (t) => {
        const r = t.match(/^(\d{1,2}):(\d{2})$/);
        if (!r) return t;
        const h = parseInt(r[1]), min = parseInt(r[2]);
        const period = h < 12 ? '上午' : '下午';
        const h12 = h % 12 || 12;
        return `${period}${h12}:${String(min).padStart(2,'0')}`;
      },
    },
    location: {
      subway: '地铁', bus: '公交', car: '自驾', parking: '停车',
      copy: '复制', copied: '已复制 ✓',
      naverMap: 'Naver地图', kakaoMap: 'Kakao地图', googleMap: 'Google地图',
    },
    contact: { groom: '新郎方', bride: '新娘方' },
    account: {
      groom: '新郎方', bride: '新娘方',
      copy: '复制', copied: '已复制 ✓', copyToast: '已复制',
    },
    guestbook: {
      namePlaceholder: '姓名',
      passwordPlaceholder: '密码',
      messagePlaceholder: '留下祝福语（最多100字）',
      submit: '提交', submitted: '已提交 ✓', submitting: '提交中…',
      empty: '暂无留言。',
      deleteTitle: '确认删除',
      deleteDesc: (name) => `将删除${name}的留言。`,
      deletePasswordPlaceholder: '输入注册时的密码',
      deletePasswordRequired: '请输入密码。',
      deleteError: '密码不正确。',
      deleteCancel: '取消', deleteConfirm: '删除',
    },
    rsvp: {
      nameLabel: '姓名', namePlaceholder: '请输入您的姓名',
      attendanceLabel: '出席情况', yes: '出席', no: '缺席',
      countLabel: '出席人数', count1: '1人', count2: '2人', count3: '3人以上',
      mealLabel: '用餐', mealYes: '参加', mealNo: '不参加',
      messageLabel: '留言（选填）',
      messagePlaceholder: '留下祝福或特殊需求',
      submit: '提交', submitting: '提交中…',
      successTitle: '已收到您的出席回复。',
      successSub: '感谢您的回复 ♡',
    },
  },

  vi: {
    editor: {
      groomSide: 'Nhà Trai',
      brideSide: 'Nhà Gái',
      weddingInfoSection: 'Thông Tin Lễ Cưới',
      groomName: 'Tên Chú Rể',
      brideName: 'Tên Cô Dâu',
      father: 'Bố',
      mother: 'Mẹ',
      date: 'Ngày Cưới',
      time: 'Giờ',
      timePlaceholder: '13:30',
      venueSearch: 'Tìm Địa Điểm',
      venueName: 'Tên Địa Điểm',
      hall: 'Sảnh / Tầng',
      address: 'Địa Chỉ',
      coordsAuto: 'Đã tự động điền',
      greeting: 'Lời Chào',
      greetingLabel: 'Nội Dung Thiệp Mời',
      transport: 'Hướng Dẫn Di Chuyển',
      dirSubway: (name) => `Đi bộ từ ga tàu điện ngầm gần ${name}\n(Thêm số đường và số cửa cụ thể)`,
      dirBus: (name, district) => `Đi xe buýt đến điểm dừng gần ${name}${district ? ' (' + district + ')' : ''}\n(Thêm số xe buýt cụ thể)`,
      dirCar: (name, addr) => `Đặt điểm đến: ${name}\n${addr}`,
      dirParking: (name) => `Có bãi đỗ xe tại ${name}\n(Liên hệ địa điểm để biết giờ và phí đỗ xe)`,
      venueUpdated: 'Thông tin địa điểm đã được cập nhật.',
      venueUpdatedNote: 'Kiểm tra và chỉnh sửa trong tab Hướng dẫn.',
    },
    cover: {
      subtitle: 'Thiệp Mời Đám Cưới',
      tagline: 'Chúng Tôi Sắp Kết Hôn',
      scroll: 'cuộn',
    },
    sections: {
      greeting: 'Lời Chào',
      weddingInfo: 'Thông Tin',
      gallery: 'Hình Ảnh',
      location: 'Địa Điểm',
      contact: 'Liên Hệ',
      account: 'Gửi Quà',
      guestbook: 'Lưu Bút',
      rsvp: 'Xác Nhận',
    },
    greeting: {
      groomSide: 'Nhà Trai',
      brideSide: 'Nhà Gái',
      formatGroomLineage: (f, m, n) => `${n}, con trai của ${f} & ${m}`,
      formatBrideLineage: (f, m, n) => `${n}, con gái của ${f} & ${m}`,
    },
    weddingInfo: {
      formatDate: (y, m, d, wi) => {
        const days = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
        return `${days[wi]}, ngày ${d} tháng ${m} năm ${y}`;
      },
      formatShortDate: (y, m, d) => `ngày ${d} tháng ${m} năm ${y}`,
      formatTime: (t) => {
        if (!t.match(/^(\d{1,2}):(\d{2})$/)) return t;
        return t;
      },
    },
    location: {
      subway: 'Tàu điện ngầm', bus: 'Xe buýt', car: 'Xe hơi', parking: 'Bãi đỗ xe',
      copy: 'Sao chép', copied: 'Đã sao chép ✓',
      naverMap: 'Naver Map', kakaoMap: 'Kakao Map', googleMap: 'Google Maps',
    },
    contact: { groom: 'Nhà Trai', bride: 'Nhà Gái' },
    account: {
      groom: 'Nhà Trai', bride: 'Nhà Gái',
      copy: 'Sao chép', copied: 'Đã sao chép ✓', copyToast: 'Đã sao chép!',
    },
    guestbook: {
      namePlaceholder: 'Tên',
      passwordPlaceholder: 'Mật khẩu',
      messagePlaceholder: 'Để lại lời chúc mừng (tối đa 100 ký tự)',
      submit: 'Gửi', submitted: 'Đã gửi ✓', submitting: 'Đang gửi…',
      empty: 'Chưa có lời nhắn nào.',
      deleteTitle: 'Xác Nhận Xóa',
      deleteDesc: (name) => `Xóa lời nhắn của ${name}.`,
      deletePasswordPlaceholder: 'Nhập mật khẩu khi đăng ký',
      deletePasswordRequired: 'Vui lòng nhập mật khẩu.',
      deleteError: 'Mật khẩu không đúng.',
      deleteCancel: 'Hủy', deleteConfirm: 'Xóa',
    },
    rsvp: {
      nameLabel: 'Tên', namePlaceholder: 'Nhập tên của bạn',
      attendanceLabel: 'Tham dự', yes: 'Tham dự', no: 'Vắng mặt',
      countLabel: 'Số người', count1: '1 người', count2: '2 người', count3: '3+ người',
      mealLabel: 'Dùng bữa', mealYes: 'Có', mealNo: 'Không',
      messageLabel: 'Lời nhắn (tùy chọn)',
      messagePlaceholder: 'Để lại lời chúc hoặc yêu cầu đặc biệt',
      submit: 'Gửi', submitting: 'Đang gửi…',
      successTitle: 'Đã nhận được xác nhận của bạn.',
      successSub: 'Cảm ơn bạn đã phản hồi ♡',
    },
  },
};
