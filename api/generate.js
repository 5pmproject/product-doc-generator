// Vercel Serverless Function for Claude API
module.exports = async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // OPTIONS 요청 처리 (CORS preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // POST 요청만 허용
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { prompt, docType } = req.body;
        
        // 입력 검증
        if (!prompt || !docType) {
            return res.status(400).json({ error: 'Missing required fields: prompt, docType' });
        }
        
        // Claude API 키 확인
        const apiKey = process.env.CLAUDE_API_KEY;
        if (!apiKey) {
            console.error('❌ CLAUDE_API_KEY 환경변수가 설정되지 않았습니다');
            return res.status(500).json({ 
                error: 'API key not configured. Please set CLAUDE_API_KEY in Vercel environment variables.' 
            });
        }
        
        console.log(`🤖 ${docType} API 호출 시작`);
        
        // Claude API 호출
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4000,
                messages: [{ role: 'user', content: prompt }]
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Claude API 오류: ${response.status} - ${errorText}`);
            return res.status(response.status).json({ 
                error: `Claude API error: ${response.status}`,
                details: errorText 
            });
        }
        
        const data = await response.json();
        const content = data.content[0].text;
        
        console.log(`✅ ${docType} 생성 완료 (${content.length}자)`);
        
        return res.status(200).json({
            success: true,
            content: content,
            docType: docType,
            length: content.length
        });
        
    } catch (error) {
        console.error('❌ API 처리 오류:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
