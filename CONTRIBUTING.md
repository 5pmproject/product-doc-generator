# 기여 가이드

제품 문서 생성 시스템에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 🚀 시작하기

1. **저장소 포크**
   - GitHub에서 이 저장소를 포크하세요

2. **로컬 클론**
   ```bash
   git clone https://github.com/your-username/product-doc-generator.git
   cd product-doc-generator
   ```

3. **개발 환경 설정**
   ```bash
   # 의존성 설치 (선택사항)
   npm install
   
   # 개발 서버 실행
   npm run dev
   ```

## 📝 기여 방법

### 버그 리포트
- [Issues](https://github.com/your-username/product-doc-generator/issues)에서 버그를 보고하세요
- 버그 재현 단계를 명확히 설명해주세요
- 브라우저 정보와 에러 메시지를 포함해주세요

### 기능 제안
- 새로운 기능 아이디어를 [Issues](https://github.com/your-username/product-doc-generator/issues)에 제안하세요
- 사용 사례와 기대 효과를 설명해주세요

### 코드 기여
1. **브랜치 생성**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **변경사항 커밋**
   ```bash
   git commit -m "Add: 새로운 기능 추가"
   ```

3. **푸시**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Pull Request 생성**
   - GitHub에서 Pull Request를 생성하세요
   - 변경사항을 명확히 설명해주세요

## 🎯 개발 가이드라인

### 코드 스타일
- **JavaScript**: ES6+ 문법 사용
- **CSS**: BEM 방법론 권장
- **HTML**: 시맨틱 마크업 사용
- **주석**: 복잡한 로직에 대한 설명 추가

### 커밋 메시지 규칙
```
type: description

- Add: 새로운 기능 추가
- Fix: 버그 수정
- Update: 기능 개선
- Remove: 기능 제거
- Docs: 문서 수정
- Style: 코드 스타일 변경
- Refactor: 코드 리팩토링
```

### 테스트
- 새로운 기능은 브라우저에서 테스트해주세요
- 다양한 브라우저에서 호환성 확인
- 모바일 반응형 테스트

## 🏗️ 프로젝트 구조

```
product-doc-generator/
├── index.html          # 메인 HTML 파일
├── README.md           # 프로젝트 설명
├── CONTRIBUTING.md     # 기여 가이드
├── LICENSE             # 라이선스
├── package.json        # 프로젝트 설정
└── .gitignore         # Git 무시 파일
```

## 🎨 디자인 가이드라인

### 색상 팔레트
- **Primary**: #c9b5a0 (베이지)
- **Secondary**: #6b5d52 (다크 브라운)
- **Accent**: #8b7d6b (뮤트 브라운)
- **Background**: #f5f1ed → #e8e1d9 (그라데이션)

### 타이포그래피
- **Headings**: Playfair Display (세리프)
- **Body**: Lato (산세리프)
- **Sizes**: 1rem (16px) 기준

### 컴포넌트
- **Cards**: 둥근 모서리 (16px), 그림자 효과
- **Buttons**: 그라데이션 배경, 호버 효과
- **Forms**: 포커스 상태, 유효성 검사

## 🐛 알려진 이슈

- [ ] Claude API 키 설정 필요
- [ ] CORS 정책으로 인한 API 호출 제한
- [ ] 모바일에서 일부 애니메이션 성능 이슈

## 📋 TODO

- [ ] 다국어 지원
- [ ] 테마 변경 기능
- [ ] 문서 템플릿 커스터마이징
- [ ] 팀 협업 기능
- [ ] 클라우드 저장소 연동

## 🤝 커뮤니티

- **Discussions**: 일반적인 질문과 아이디어 공유
- **Issues**: 버그 리포트와 기능 요청
- **Pull Requests**: 코드 기여

## 📞 연락처

- **이메일**: your-email@example.com
- **GitHub**: [@your-username](https://github.com/your-username)

---

기여해주셔서 다시 한번 감사합니다! 🎉
