# 제품 문서 생성 시스템

> 5분만 투자하면 전문적인 BRD, PRD, TRD를 자동 생성합니다

AI 기반 제품 문서 자동 생성 시스템으로, 6개 질문에 답변하면 Claude AI가 전문적인 비즈니스 요구사항 문서(BRD), 제품 요구사항 문서(PRD), 기술 요구사항 문서(TRD)를 자동으로 생성합니다.

## ✨ 주요 기능

### Phase 1: 사용자 입력
- **6개 핵심 질문**: 인사이트, 검증 근거, 팀 역량, 원칙, 성공 정의, 기능 아이디어
- **실시간 검증**: 글자수 제한 및 유효성 검사
- **자동 저장**: 로컬 스토리지 기반 데이터 보존
- **진행률 표시**: 직관적인 사용자 경험
- **반응형 디자인**: 모바일/데스크톱 완벽 지원

### Phase 2: AI 문서 생성
- **Claude AI 통합**: Anthropic Claude Sonnet 4 기반
- **3단계 문서 생성**: BRD → PRD → TRD 순차 생성
- **실시간 상태 표시**: 생성 진행 상황 추적
- **승인/재생성**: 각 문서별 검토 및 수정 가능
- **에러 핸들링**: 재시도 메커니즘 포함

### 문서 관리
- **복사 기능**: 클립보드로 즉시 복사
- **Markdown 다운로드**: 개별 문서 파일 다운로드
- **일괄 다운로드**: 모든 문서 + JSON 데이터 백업
- **버전 관리**: 문서별 버전 추적

## 🚀 사용 방법

### 1. 질문 답변
6개 핵심 질문에 답변하세요:
1. **핵심 인사이트**: 해결하려는 핵심 문제
2. **검증 근거**: 데이터나 근거
3. **팀 역량**: 보유한 기술과 경험
4. **절대 원칙**: 타협할 수 없는 가치
5. **성공 정의**: 구체적인 성공 기준
6. **핵심 기능**: 솔루션 아이디어

### 2. BRD 생성
- "BRD 생성하기" 클릭
- Claude AI가 자동으로 전문적인 BRD 작성
- 검토 후 승인 또는 재생성

### 3. PRD 생성
- BRD를 기반으로 상세 PRD 자동 생성
- 기능 요구사항 및 사용자 스토리 포함
- 승인 후 다음 단계로 진행

### 4. TRD 생성 (선택)
- 기술 문서가 필요한 경우 생성
- 필요 없으면 건너뛰기 가능
- 아키텍처 및 기술 스펙 포함

### 5. 문서 활용
- 복사하여 다른 곳에 붙여넣기
- Markdown 파일로 다운로드
- 전체 프로젝트 데이터 JSON 백업

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI API**: Claude Sonnet 4 (Anthropic)
- **Storage**: LocalStorage + JSON
- **Design**: Playfair Display + Lato 폰트
- **Export**: Markdown 파일 다운로드

## 📊 데이터 구조

완벽하게 구조화된 JSON 형식으로 저장:

```json
{
  "id": "UUID",
  "created_at": "ISO timestamp",
  "status": "input|brd_generating|prd_generating|trd_generating|completed",
  "user_input": {
    "insight": "핵심 인사이트",
    "evidence": "검증 근거",
    "capability": "팀 역량",
    "principle": "절대 원칙",
    "success_metric": "성공 정의",
    "core_features": "핵심 기능"
  },
  "documents": {
    "brd": { "content": "", "status": "pending|generating|generated|approved", "version": 0 },
    "prd": { "content": "", "status": "pending|generating|generated|approved", "version": 0 },
    "trd": { "content": "", "status": "pending|generating|generated|approved", "version": 0 }
  },
  "structured_data": {
    "personas": [],
    "features": [],
    "metrics": [],
    "technical_specs": []
  },
  "history": []
}
```

## 🎯 문서 구조

### BRD (Business Requirements Document)
1. Executive Summary
2. Business Objectives
3. Market Analysis
4. Problem Statement
5. Proposed Solution
6. Success Criteria
7. Stakeholders
8. Constraints & Risks
9. Timeline & Milestones
10. Budget & Resources

### PRD (Product Requirements Document)
1. Product Overview
2. User Personas
3. Feature Requirements
4. User Stories
5. User Experience
6. Functional Requirements
7. Non-Functional Requirements
8. Data Requirements
9. Integration Requirements
10. Success Metrics

### TRD (Technical Requirements Document)
1. Technical Overview
2. System Architecture
3. Technology Stack
4. Data Architecture
5. API Design
6. Security Requirements
7. Performance Requirements
8. Scalability & Availability
9. Development Guidelines
10. Implementation Roadmap

## 🔧 개발자 도구

브라우저 콘솔(F12)에서 사용 가능한 디버깅 함수:

```javascript
// 프로젝트 데이터 확인
projectData

// 요약 정보
projectData.getSummary()

// 데이터 다운로드
downloadProjectData()

// 초기화
resetProject()
```

## 🎨 디자인 시스템

- **폰트**: Playfair Display (세리프) + Lato (산세리프)
- **색상**: 뮤트된 뉴트럴 톤 (#6b5d52, #8b7d6b, #c9b5a0)
- **배경**: 그라데이션 (#f5f1ed → #e8e1d9)
- **UI**: 글래스모피즘 효과 (backdrop-filter: blur)
- **반응형**: 모바일 우선 설계

## 📱 반응형 지원

- **데스크톱**: 800px 최대 너비, 최적화된 레이아웃
- **태블릿**: 768px 이하에서 적응형 디자인
- **모바일**: 480px 이하에서 세로 스택 레이아웃

## 🚀 시작하기

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/product-doc-generator.git
   cd product-doc-generator
   ```

2. **브라우저에서 열기**
   ```bash
   # 간단한 HTTP 서버 실행 (Python 3)
   python -m http.server 8000
   
   # 또는 Node.js
   npx serve .
   ```

3. **브라우저에서 접속**
   ```
   http://localhost:8000
   ```

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 있거나 제안사항이 있으시면 [Issues](https://github.com/your-username/product-doc-generator/issues)에 등록해주세요.

---

**제품 문서 생성 시스템**으로 5분만에 전문적인 BRD, PRD, TRD를 완성하세요! 🚀
