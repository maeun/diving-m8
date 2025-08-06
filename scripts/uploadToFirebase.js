const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} = require('firebase/firestore');

// 실제 Firebase 프로젝트 설정 (diving-m8)
const firebaseConfig = {
  apiKey: 'AIzaSyCftPP2-OORWjbGJ-HVseVINk-zqOxc7wY',
  authDomain: 'diving-m8.firebaseapp.com',
  projectId: 'diving-m8',
  storageBucket: 'diving-m8.firebasestorage.app',
  messagingSenderId: '179779366495',
  appId: '1:179779366495:web:15085a6d0b346669c7f5ea',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 강사 데이터들
const instructorsData = [
  {
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
  },
  {
    id: 'sarah-johnson',
    userId: 'user2',
    name: 'Sarah Johnson',
    profileImage:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    bio: 'Passionate diving instructor with over 8 years of experience teaching divers of all levels. Specialized in underwater photography and marine conservation.',
    address: 'Monterey Bay, California, USA',
    certifications: [
      {
        name: 'Open Water Scuba Instructor',
        organization: 'PADI',
        level: 'OWSI',
        issueDate: new Date('2016-03-15'),
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
        description: 'Complete PADI Open Water certification course',
        price: 450,
        currency: 'USD',
        duration: '3-4 days',
        maxParticipants: 4,
      },
      {
        name: 'Advanced Open Water',
        description: 'Take your diving to the next level',
        price: 350,
        currency: 'USD',
        duration: '2 days',
        maxParticipants: 6,
      },
    ],
    gallery: [],
    socialLinks: { instagram: 'https://instagram.com/sarahdives' },
    stats: { views: 890, saves: 67, inquiries: 15 },
    isApproved: true,
    isActive: true,
    createdAt: new Date('2020-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'mike-rodriguez',
    userId: 'user3',
    name: 'Mike Rodriguez',
    profileImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    bio: 'Technical diving specialist with 12 years of experience. Expert in cave diving and deep water exploration.',
    address: 'Miami, Florida, USA',
    certifications: [
      {
        name: 'Technical Diving Instructor',
        organization: 'TDI',
        level: 'Instructor',
        issueDate: new Date('2012-08-20'),
      },
    ],
    experience: 12,
    specialties: [
      'Technical Diving',
      'Cave Diving',
      'Deep Diving',
      'Wreck Diving',
    ],
    services: [
      {
        name: 'Technical Diving Course',
        description: 'Advanced technical diving training',
        price: 800,
        currency: 'USD',
        duration: '5 days',
        maxParticipants: 3,
      },
      {
        name: 'Cave Diving Certification',
        description: 'Learn safe cave diving techniques',
        price: 600,
        currency: 'USD',
        duration: '4 days',
        maxParticipants: 2,
      },
    ],
    gallery: [],
    socialLinks: { website: 'https://miketech-diving.com' },
    stats: { views: 1100, saves: 45, inquiries: 12 },
    isApproved: true,
    isActive: true,
    createdAt: new Date('2019-05-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

async function uploadInstructors() {
  try {
    console.log('🚀 Starting upload to Firebase...');
    console.log('📍 Project ID:', firebaseConfig.projectId);

    for (const instructorData of instructorsData) {
      console.log(
        `📝 Uploading instructor: ${instructorData.name} (${instructorData.id})`
      );

      // 강사 데이터를 Firestore에 업로드
      await setDoc(doc(db, 'instructors', instructorData.id), instructorData);

      console.log(`✅ Successfully uploaded: ${instructorData.name}`);
    }

    console.log('🎉 All instructors uploaded successfully!');
    console.log('🔗 Access URLs:');
    instructorsData.forEach((instructor) => {
      console.log(`   - http://localhost:3001/instructor/${instructor.id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading instructors:', error);
    process.exit(1);
  }
}

uploadInstructors();
