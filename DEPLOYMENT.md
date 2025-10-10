# 배포 가이드

제품 문서 생성 시스템을 GitHub에 업로드하고 배포하는 방법을 안내합니다.

## 🚀 GitHub 업로드

### 1. GitHub 저장소 생성
1. [GitHub](https://github.com)에 로그인
2. "New repository" 클릭
3. 저장소 이름: `product-doc-generator`
4. 설명: "AI 기반 제품 문서 자동 생성 시스템 - BRD, PRD, TRD를 5분만에 완성"
5. Public 선택 (오픈소스)
6. "Create repository" 클릭

### 2. 로컬 저장소와 연결
```bash
# 원격 저장소 추가
git remote add origin https://github.com/your-username/product-doc-generator.git

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

### 3. GitHub Pages 활성화
1. GitHub 저장소 → Settings
2. Pages 섹션으로 이동
3. Source: "Deploy from a branch" 선택
4. Branch: "main" 선택
5. Folder: "/ (root)" 선택
6. Save 클릭

## 🌐 배포 옵션

### GitHub Pages (권장)
- **장점**: 무료, 자동 배포, HTTPS 지원
- **URL**: `https://your-username.github.io/product-doc-generator`
- **설정**: 저장소 Settings → Pages에서 활성화

### Netlify
1. [Netlify](https://netlify.com)에 가입
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. Build settings:
   - Build command: `echo "No build needed"`
   - Publish directory: `.`
5. Deploy 클릭

### Vercel
1. [Vercel](https://vercel.com)에 가입
2. "Import Git Repository" 클릭
3. GitHub 저장소 선택
4. Framework Preset: "Other" 선택
5. Deploy 클릭

## 🔧 환경 설정

### Claude API 설정
현재 코드는 Claude API를 사용하므로, 실제 배포 시에는 다음 중 하나를 선택해야 합니다:

#### 옵션 1: API 키 설정 (프론트엔드)
```javascript
// index.html의 fetch 요청에 API 키 추가
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
```

#### 옵션 2: 백엔드 프록시 서버
```javascript
// API 요청을 백엔드로 프록시
const response = await fetch("/api/generate-document", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, docType })
});
```

#### 옵션 3: 데모 모드
```javascript
// 실제 API 호출 대신 데모 데이터 사용
function generateDemoDocument(docType) {
    const demoTemplates = {
        brd: "## Business Requirements Document\n\n[데모 BRD 내용]",
        prd: "## Product Requirements Document\n\n[데모 PRD 내용]",
        trd: "## Technical Requirements Document\n\n[데모 TRD 내용]"
    };
    return demoTemplates[docType];
}
```

## 📱 모바일 최적화

### PWA 설정 (선택사항)
```html
<!-- manifest.json -->
{
  "name": "제품 문서 생성 시스템",
  "short_name": "DocGen",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f5f1ed",
  "theme_color": "#c9b5a0"
}
```

### 메타 태그 최적화
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="AI 기반 제품 문서 자동 생성 시스템">
<meta name="keywords" content="BRD,PRD,TRD,문서생성,AI,Claude">
```

## 🔒 보안 고려사항

### API 키 보호
- 프론트엔드에 API 키를 직접 노출하지 마세요
- 환경 변수나 백엔드 프록시 사용 권장
- CORS 정책 확인

### 데이터 보호
- 로컬 스토리지 데이터는 클라이언트에만 저장
- 민감한 정보는 서버에 저장하지 않음
- HTTPS 사용 권장

## 📊 성능 최적화

### 이미지 최적화
- WebP 형식 사용
- 적절한 크기로 리사이즈
- Lazy loading 적용

### 코드 최적화
- CSS/JS 압축
- 불필요한 코드 제거
- CDN 사용 고려

## 🧪 테스트

### 브라우저 호환성
- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

### 모바일 테스트
- iOS Safari
- Android Chrome
- 반응형 디자인 확인

## 📈 모니터링

### Google Analytics (선택사항)
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 에러 추적
- Sentry 또는 유사한 서비스 사용
- 사용자 피드백 수집

## 🚀 배포 체크리스트

- [ ] 모든 파일이 Git에 커밋됨
- [ ] README.md가 완성됨
- [ ] LICENSE 파일 포함
- [ ] .gitignore 설정 완료
- [ ] GitHub 저장소 생성
- [ ] 원격 저장소 연결
- [ ] GitHub Pages 활성화
- [ ] 도메인 설정 (선택사항)
- [ ] SSL 인증서 확인
- [ ] 모바일 테스트 완료
- [ ] 브라우저 호환성 확인
- [ ] 성능 최적화 완료

## 📞 지원

배포 과정에서 문제가 있으시면:
- [Issues](https://github.com/your-username/product-doc-generator/issues)에 등록
- [Discussions](https://github.com/your-username/product-doc-generator/discussions)에서 질문

---

성공적인 배포를 위해 이 가이드를 따라해주세요! 🎉
