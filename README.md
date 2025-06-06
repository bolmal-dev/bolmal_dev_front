# 🎭 볼래말래 (Bolmal)

> **콘서트 티켓 예매 정보를 한눈에! 놓치지 말고 볼래말래?**

볼래말래는 다양한 콘서트와 공연 정보를 통합하여 제공하는 티켓팅 플랫폼입니다. 사용자가 원하는 공연을 쉽게 찾고, 티켓 오픈 일정을 놓치지 않도록 도와줍니다.

## ✨ 주요 기능

### 🔍 **스마트 검색**

-   아티스트명, 공연명으로 빠른 검색
-   실시간 검색 결과 제공 (TanStack Query 캐싱)
-   URL 기반 검색 (공유 가능한 검색 링크)

### 🎫 **공연 정보 통합 관리**

-   티켓 오픈 일정 알림
-   팬클럽 선예매/일반예매 구분
-   공연 포스터 및 상세 정보 제공
-   공연장 위치 정보 (카카오맵 연동)

### 🏠 **개인화된 추천**

-   "지금, 볼래말래?" 섹션으로 맞춤 공연 추천
-   주간 인기 티켓 정보
-   광고 및 프로모션 배너

### 🔐 **사용자 인증**

-   카카오 소셜 로그인
-   NextAuth.js 기반 세션 관리
-   JWT 토큰 자동 갱신

### 📱 **반응형 디자인**

-   모바일, 태블릿, 데스크톱 최적화
-   직관적인 카드 형태의 공연 정보 표시

## 🛠️ 기술 스택

### **Frontend**

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **State Management**: TanStack Query, Zustand
-   **Map Integration**: 카카오맵 API

### **Authentication**

-   **Auth Framework**: NextAuth.js
-   **Social Login**: 카카오 OAuth
-   **Token Management**: JWT with refresh token

### **Development Tools**

-   **Package Manager**: Yarn
-   **Code Quality**: ESLint, Prettier
-   **Build Tool**: Next.js built-in bundler

## 🚀 시작하기

### **필수 요구사항**

-   Node.js 18.0 이상
-   Yarn 1.22 이상

### **설치 및 실행**

```bash
# 저장소 클론
git clone https://github.com/your-username/bolmal.git
cd bolmal

# 의존성 설치
yarn install

# 환경변수 설정
cp .env.example .env.local
# .env.local 파일에 필요한 환경변수 입력

# 개발 서버 실행
yarn dev
```

### **환경변수 설정**

`.env.local` 파일에 환경변수를 설정하세요.
환경변수 내용은 개인적으로 연락주시면 감사하겠습니다.

## 📁 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── auth/                # NextAuth 설정
│   │   └── concerts/            # 공연 API
│   ├── search/                  # 검색 페이지
│   ├── concert/                 # 공연 상세 페이지
│   │   └── [id]/               # 동적 라우팅
│   ├── artist/                  # 아티스트 페이지
│   ├── login/                   # 로그인 페이지
│   ├── sign-up/                 # 회원가입 페이지
│   ├── tips/                    # 팁 페이지
│   └── layout.tsx               # 루트 레이아웃
├── components/                   # 재사용 가능한 컴포넌트
│   ├── nav/                     # 네비게이션 관련
│   │   ├── navigation.tsx       # 메인 네비게이션
│   │   ├── search.tsx           # 검색 컴포넌트
│   │   ├── menu.tsx             # 메뉴
│   │   └── user-option.tsx      # 사용자 옵션
│   ├── search/                  # 검색 관련
│   │   └── search-result.tsx    # 검색 결과
│   ├── concert/                 # 공연 관련
│   │   ├── mainInfo.tsx         # 메인 정보
│   │   ├── ticketingButton.tsx  # 티켓팅 버튼
│   │   └── underInfo/           # 하단 정보
│   ├── now-bolmal/              # 추천 시스템
│   │   ├── now-bolmal.tsx       # 메인 추천
│   │   └── concertRecommend.tsx # 공연 추천
│   ├── weekly-ticket/           # 주간 티켓
│   ├── profile/                 # 프로필 관련
│   ├── kakao-map/               # 카카오맵 연동
│   ├── providers/               # Context Providers
│   └── ticket.tsx               # 티켓 컴포넌트
├── hooks/                       # 커스텀 훅
│   ├── useClickOutside.ts       # 외부 클릭 감지
│   ├── useKakaoLogin.ts         # 카카오 로그인
│   └── useUserInfo.ts           # 사용자 정보
├── utils/                       # 유틸리티 함수
│   ├── fetchInstance.ts         # API 호출 래퍼
│   ├── changeDataFormat.ts      # 데이터 포맷 변환
│   └── auth/                    # 인증 관련
│       ├── refresh.ts           # 토큰 갱신
│       └── token.ts             # 토큰 관리
└── public/                      # 정적 파일
    ├── artist_header.svg        # 아티스트 헤더
    ├── kakao.svg                # 카카오 아이콘
    └── ㅂㄹㅁㄹ.svg               # 로고
```

## 🎨 디자인 시스템

### **컬러 팔레트**

-   **Primary**: Tailwind의 primary 색상 (커스터마이징 가능)
-   **Background**: bg-bg-default
-   **Text**: 기본 text-black, 보조 text-gray-500
-   **Error**: text-red-500

### **타이포그래피**

-   제목: `text-2xl font-bold`
-   본문: `text-base font-normal`
-   캡션: `text-sm font-medium`

## 🚦 개발 스크립트

```bash
# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 빌드 결과 실행
yarn start

# TypeScript 타입 검사
yarn type-check

# ESLint 검사
yarn lint

# Prettier 포맷팅
yarn format
```

## 🔑 주요 기능 구현

### **검색 기능**

-   URL 파라미터 기반 검색 (`/search?q=검색어`)
-   TanStack Query로 캐싱 및 상태 관리
-   Suspense 경계로 SSR 지원

### **인증 시스템**

-   NextAuth.js + 카카오 OAuth
-   JWT 토큰 자동 갱신
-   세션 기반 사용자 상태 관리

### **지도 연동**

-   카카오맵 API 통합
-   공연장 위치 표시

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참고하세요.

## 👥 팀

-   **Frontend Developer**: [고제성, 박희웅]
-   **Backend Developer**: [전재연, 김민석]
-   **Designer**: [김규리, 당현송]

## 📞 문의

프로젝트에 대한 질문이나 제안이 있으시면 언제든 연락주세요!

-   **Email**: js95112345@gmail.com
-   **GitHub Issues**: [프로젝트 이슈 페이지](https://github.com/your-username/bolmal/issues)

---

**볼래말래와 함께 놓치지 않는 콘서트 라이프를 즐겨보세요! 🎵**
