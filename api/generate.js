// Claude API 연동 Vercel Serverless Function
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
  
    // 요청 본문 확인
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        error: 'Missing prompt', 
        message: 'prompt 필드가 필요합니다.' 
      });
    }
  
    try {
      console.log('Claude API 호출 시작...');
      
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
              content: `다음 요청에 대해 전문적인 문서를 생성해주세요:
  
  ${prompt}
  
  요청사항:
  - 체계적이고 구조화된 내용
  - 실용적이고 구체적인 정보 제공
  - 마크다운 형식으로 작성
  - 한국어로 작성`
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
  