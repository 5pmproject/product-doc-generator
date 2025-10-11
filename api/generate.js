// Claude API 연동 Vercel Serverless Function - BRD/PRD/TRD 전문 생성
export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  
    // OPTIONS 요청 처리
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    // POST 요청만 허용
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        error: 'Method not allowed', 
        allowedMethods: ['POST'] 
      });
    }
  
    // 환경변수에서 Claude API 키 가져오기
    const claudeApiKey = process.env.CLAUDE_API_KEY;
    
    if (!claudeApiKey) {
      return res.status(500).json({ 
        error: 'Claude API key not configured',
        message: 'CLAUDE_API_KEY 환경변수가 설정되지 않았습니다.'
      });
    }
  
    // 요청 본문에서 데이터 추출
    const { 
      prompt,  // 기존 호환성 유지
      insight, 
      evidence, 
      capability, 
      principle, 
      success_metric, 
      core_features,
      documentType = 'BRD',
      brd = null,
      prd = null,
      section = null,
      context = null
    } = req.body;
    
    // 기존 방식(prompt) 또는 새로운 방식(6개 질문) 지원
    if (!prompt && !insight) {
      return res.status(400).json({ 
        error: 'Missing required data', 
        message: 'prompt 또는 6개 질문 답변이 필요합니다.' 
      });
    }
  
    try {
      console.log(`${documentType} 생성 시작...`);
      
      let content = '';
      
      // 기존 방식 (단순 프롬프트)
      if (prompt && !insight) {
        content = `다음 요청에 대해 전문적인 문서를 생성해주세요:
  
  ${prompt}
  
  요청사항:
  - 체계적이고 구조화된 내용
  - 실용적이고 구체적인 정보 제공
  - 마크다운 형식으로 작성
  - 한국어로 작성`;
      }
      // 새로운 방식 (전문 BRD/PRD/TRD)
      else if (documentType === 'BRD') {
        content = `당신은 제품 전략 및 비즈니스 분석 전문가입니다. 다음 정보를 바탕으로 전문적인 Business Requirements Document(BRD)를 작성해주세요.
  
  **사용자 입력 데이터:**
  
  **핵심 인사이트:**
  ${insight}
  
  **검증 근거:**
  ${evidence}
  
  **팀 역량:**
  ${capability}
  
  **절대 원칙:**
  ${principle}
  
  **성공 정의:**
  ${success_metric}
  
  **핵심 기능 아이디어:**
  ${core_features}
  
  ---
  
  **BRD 작성 가이드라인:**
  
  다음 구조로 전문적이고 상세한 BRD를 작성해주세요:
  
  ## 1. Executive Summary
  - 프로젝트 개요 (2-3 문단)
  - 핵심 비즈니스 가치
  - 예상 ROI 및 영향
  
  ## 2. Business Objectives
  - 구체적인 비즈니스 목표 (3-5개)
  - 각 목표의 측정 가능한 지표
  - 목표 달성 타임라인
  
  ## 3. Market Analysis
  - 시장 기회 분석
  - 타겟 고객 페르소나
  - 경쟁사 분석
  
  ## 4. Problem Statement
  - 해결하려는 핵심 문제
  - 문제의 비즈니스 영향
  - 현재 상황 (As-Is)
  
  ## 5. Proposed Solution
  - 솔루션 개요
  - 핵심 기능 및 가치 제안
  - 기대되는 결과 (To-Be)
  
  ## 6. Success Criteria
  - 정량적 KPI (3-5개)
  - 정성적 성공 지표
  - 측정 방법
  
  ## 7. Stakeholders
  - 주요 이해관계자
  - 각 이해관계자의 역할
  - 의사결정 프로세스
  
  ## 8. Constraints & Risks
  - 제약 사항 (시간, 예산, 기술, 리소스)
  - 주요 리스크 및 완화 방안
  - 의존성
  
  ## 9. Timeline & Milestones
  - 주요 마일스톤
  - 단계별 일정
  - 출시 계획
  
  ## 10. Budget & Resources
  - 예산 추정
  - 필요 리소스
  - 투자 대비 기대 효과
  
  **중요:**
  - 각 섹션은 구체적이고 실행 가능해야 합니다
  - 비즈니스 가치와 ROI를 명확히 제시하세요
  - 데이터 기반의 의사결정을 강조하세요
  - 전문적이고 설득력 있는 문체를 사용하세요
  - 마크다운 형식으로 작성하세요`;
  
      } else if (documentType === 'PRD') {
        content = `당신은 제품 관리 및 요구사항 분석 전문가입니다. 아래의 BRD와 사용자 입력을 바탕으로 상세한 Product Requirements Document(PRD)를 작성해주세요.
  
  **BRD:**
  ${brd}
  
  **원본 사용자 입력:**
  - 핵심 인사이트: ${insight}
  - 검증 근거: ${evidence}
  - 팀 역량: ${capability}
  - 절대 원칙: ${principle}
  - 성공 정의: ${success_metric}
  - 핵심 기능: ${core_features}
  
  ---
  
  **PRD 작성 가이드라인:**
  
  ## 1. Product Overview
  - 제품 비전
  - 제품 목표
  - 타겟 사용자
  
  ## 2. User Personas
  - 주요 페르소나 (3-4개)
  - 각 페르소나의 니즈와 페인 포인트
  - 사용 시나리오
  
  ## 3. Feature Requirements
  각 기능마다 다음을 포함:
  - 기능 이름 및 설명
  - 우선순위 (P0/P1/P2)
  - 사용자 스토리
  - 인수 기준
  - 의존성
  
  ## 4. User Stories
  - Epic별 사용자 스토리
  - 스토리 포인트
  - Definition of Done
  
  ## 5. User Experience
  - 주요 사용자 플로우
  - 화면 구성 및 레이아웃
  - 인터랙션 설계
  
  ## 6. Functional Requirements
  - 상세 기능 명세
  - 입력/출력 정의
  - 비즈니스 규칙
  
  ## 7. Non-Functional Requirements
  - 성능 요구사항
  - 보안 요구사항
  - 확장성 및 가용성
  - 접근성
  
  ## 8. Data Requirements
  - 데이터 모델
  - 데이터 플로우
  - 저장소 요구사항
  
  ## 9. Integration Requirements
  - 외부 시스템 연동
  - API 명세
  - 데이터 동기화
  
  ## 10. Success Metrics
  - 기능별 성공 지표
  - 측정 방법
  - 목표값
  
  **중요:**
  - 개발팀이 바로 구현할 수 있을 만큼 구체적으로 작성하세요
  - 각 요구사항은 명확하고 검증 가능해야 합니다
  - 우선순위를 명확히 하세요
  - 마크다운 형식으로 작성하세요`;
  
      } else if (documentType === 'TRD') {
        content = `당신은 시스템 아키텍처 및 기술 설계 전문가입니다. BRD와 PRD를 바탕으로 상세한 Technical Requirements Document(TRD)를 작성해주세요.
  
  **BRD:**
  ${brd}
  
  **PRD:**
  ${prd}
  
  **사용자 입력:**
  - 핵심 인사이트: ${insight}
  - 검증 근거: ${evidence}
  - 팀 역량: ${capability}
  - 절대 원칙: ${principle}
  - 성공 정의: ${success_metric}
  - 핵심 기능: ${core_features}
  
  ---
  
  **TRD 작성 가이드라인:**
  
  ## 1. Technical Overview
  - 시스템 아키텍처 개요
  - 기술 스택 선정 이유
  - 설계 원칙
  
  ## 2. System Architecture
  - 고수준 아키텍처 다이어그램 설명
  - 컴포넌트 구조
  - 마이크로서비스 분해 전략
  - 데이터 플로우
  
  ## 3. Technology Stack
  - 프론트엔드 기술 (React, Vue, Angular 등)
  - 백엔드 기술 (Node.js, Python, Java 등)
  - 데이터베이스 (PostgreSQL, MongoDB 등)
  - 인프라 및 배포 (AWS, Docker, Kubernetes)
  
  ## 4. Database Design
  - ERD 설계 및 설명
  - 테이블 스키마 상세
  - 인덱스 전략
  - 데이터 파티셔닝
  
  ## 5. API Specifications
  - REST API 설계 원칙
  - GraphQL 고려사항
  - 엔드포인트 명세
  - 인증 및 권한 관리
  
  ## 6. Security Requirements
  - 보안 위협 분석 (OWASP Top 10)
  - 인증/인가 구현
  - 데이터 암호화
  - API 보안
  
  ## 7. Performance Requirements
  - 응답 시간 목표
  - 동시 사용자 처리량
  - 데이터베이스 최적화
  - 캐싱 전략
  
  ## 8. Scalability & Availability
  - 수평적 확장 전략
  - 로드 밸런싱
  - 장애 복구 계획
  - SLA 목표
  
  ## 9. Development Guidelines
  - 코딩 컨벤션
  - Git 워크플로우
  - 코드 리뷰 프로세스
  - 테스트 전략 (Unit, Integration, E2E)
  
  ## 10. Implementation Roadmap
  - 개발 단계별 계획
  - 기술 부채 관리
  - 모니터링 및 로깅
  - 배포 전략
  
  **중요:**
  - 개발팀이 즉시 구현할 수 있는 수준의 기술 명세를 제공하세요
  - 확장성과 유지보수성을 고려하세요
  - 성능과 보안을 중점적으로 다루세요
  - 실제 코드 예시나 설정 파일 예시를 포함하세요
  - 마크다운 형식으로 작성하세요`;
  
      } else if (documentType === 'EXPAND') {
        content = `다음 문서 섹션을 더 상세하고 실무적으로 확장해주세요:
  
  **섹션명:** ${section}
  
  **현재 내용:**
  ${context}
  
  **확장 요구사항:**
  - 현재 내용을 3-5배 더 상세하게 작성
  - 실무에서 바로 사용할 수 있는 구체적인 내용 포함
  - 예시, 코드 스니펫, 체크리스트 등 추가
  - 단계별 실행 가이드 제공
  - 마크다운 형식으로 작성`;
      }
      
      // Claude API 호출
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': claudeApiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          temperature: 0.7,
          messages: [
            {
              role: 'user',
              content: content
            }
          ]
        })
      });
  
      console.log('Claude API 응답 상태:', response.status);
      
      const data = await response.json();
      console.log('Claude API 응답 데이터:', JSON.stringify(data, null, 2));
      
      if (response.ok) {
        // 성공적인 응답
        res.status(200).json({ 
          success: true,
          content: data.content[0].text,
          model: data.model,
          usage: data.usage,
          documentType: documentType,
          timestamp: new Date().toISOString()
        });
      } else {
        // Claude API 에러
        console.error('Claude API 에러:', data);
        res.status(response.status).json({ 
          error: 'Claude API error',
          status: response.status,
          type: data.error?.type || 'unknown_error',
          message: data.error?.message || 'Unknown error occurred',
          details: data
        });
      }
    } catch (error) {
      console.error('API 호출 실패:', error);
      res.status(500).json({ 
        error: 'Request failed', 
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
  