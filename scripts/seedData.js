const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  doc,
  setDoc,
  connectFirestoreEmulator,
} = require('firebase/firestore');

// Firebase 설정
const firebaseConfig = {
  projectId: 'demo-project',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Emulator에 연결
connectFirestoreEmulator(db, 'localhost', 8082);

// 테스트 강사 데이터
const instructorData = {
  id: 'pofthesea',
  userId: 'user1',
  name: '윤여준(Yeojun Yoon)',
  profileImage: '/yeojun_profile.jpg',
  bio: 'WIZ 다이빙을 이끌고 있는 윤여준입니다. 어디를 가나 세계 최고의 다이빙 프로그램을 제공합니다.',
  address: '대한민국, 서울',
  certifications: [
    {
      name: 'Open Water Scuba Instructor',
      organization: 'PADI',
      level: 'OWSI',
      issueDate: new Date('2016-03-15'),
    },
    {
      name: 'Advanced Open Water Instructor',
      organization: 'PADI',
      level: 'AOWI',
      issueDate: new Date('2017-06-20'),
    },
    {
      name: 'Rescue Diver Instructor',
      organization: 'PADI',
      level: 'RDI',
      issueDate: new Date('2018-09-10'),
    },
  ],
  experience: 8,
  specialties: [
    'Underwater Photography',
    'Night Diving',
    'Deep Diving',
    'Marine Conservation',
  ],
  services: [
    {
      name: 'Open Water Certification',
      description:
        'Complete PADI Open Water certification course including theory, pool sessions, and open water dives.',
      price: 450,
      currency: 'USD',
      duration: '3-4 days',
      maxParticipants: 4,
    },
    {
      name: 'Advanced Open Water',
      description:
        'Take your diving to the next level with 5 adventure dives including deep and navigation.',
      price: 350,
      currency: 'USD',
      duration: '2 days',
      maxParticipants: 6,
    },
    {
      name: 'Underwater Photography Course',
      description:
        'Learn the art of underwater photography with hands-on training and equipment guidance.',
      price: 200,
      currency: 'USD',
      duration: '1 day',
      maxParticipants: 3,
    },
  ],
  gallery: [
    {
      url: '/yeojun_1.jpg',
      type: 'image',
      order: 0,
    },
    {
      url: '/yeojun_2.jpg',
      type: 'image',
      order: 1,
    },
    {
      url: '/yeojun_3.jpg',
      type: 'image',
      order: 2,
    },
  ],
  socialLinks: {
    instagram: 'https://www.instagram.com/pofthesea',
    facebook: 'https://www.facebook.com/pofthesea',
    website: 'https://m.blog.naver.com/yeochia',
  },
  stats: {
    views: 1250,
    saves: 89,
    inquiries: 23,
  },
  isApproved: true,
  isActive: true,
  createdAt: new Date('2020-01-15'),
  updatedAt: new Date('2024-01-15'),
};

async function seedData() {
  try {
    console.log('Adding instructor data to Firestore...');

    // 강사 데이터 추가
    await setDoc(doc(db, 'instructors', 'pofthesea'), instructorData);

    console.log('✅ Instructor data added successfully!');
    console.log('📍 Document ID: pofthesea');
    console.log('🔗 Access URL: http://localhost:3001/instructor/pofthesea');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding data:', error);
    process.exit(1);
  }
}

seedData();
