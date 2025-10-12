export default async function handler(req, res) {
    console.log('🚀 API 함수 실행!', req.method);
    
    // CORS 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    // 환경변수 확인
    const claudeApiKey = process.env.CLAUDE_API_KEY;
    if (!claudeApiKey) {
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'CLAUDE_API_KEY 환경변수를 설정해주세요.'
      });
    }
  
    // 요청 데이터 확인
    const { insight, evidence, capability, principle, success_metric, core_features } = req.body;
    
    if (!insight) {
      return res.status(400).json({ 
        error: 'Missing data',
        message: 'insight 필드가 필요합니다.'
      });
    }
  
    try {
      console.log('🤖 Claude API 호출 시작...');
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': claudeApiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          temperature: 0.7,
          messages: [{
            role: 'user',
            content: `다음 정보를 바탕으로 간단한 BRD를 작성해주세요:
  
  핵심 인사이트: ${insight}
  검증 근거: ${evidence}
  팀 역량: ${capability}
  절대 원칙: ${principle}
  성공 정의: ${success_metric}
  핵심 기능: ${core_features}
  
  # Business Requirements Document
  
  ## 1. 프로젝트 개요
  ## 2. 비즈니스 목표
  ## 3. 솔루션 제안
  ## 4. 성공 지표
  
  각 섹션을 구체적으로 작성해주세요.`
          }]
        })
      });
  
      console.log('📡 Claude API 응답 상태:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Claude API 에러:', errorData);
        return res.status(response.status).json({
          error: 'Claude API error',
          message: errorData.error?.message || 'API 호출 실패'
        });
      }
  
      const data = await response.json();
      console.log('✅ Claude API 성공!');
      
      return res.status(200).json({
        success: true,
        content: data.content[0].text,
        usage: data.usage,
        timestamp: new Date().toISOString()
      });
  
    } catch (error) {
      console.error('💥 네트워크 에러:', error);
      return res.status(500).json({
        error: 'Network error',
        message: error.message
      });
    }
  }
  