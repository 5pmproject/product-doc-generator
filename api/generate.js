// api/generate.js
// Vercel Serverless Function for Claude API

module.exports = async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Credentials', true);
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
        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ error: 'Prompt is required and must be a string' });
        }
        
        if (!docType) {
            return res.status(400).json({ error: 'docType is required' });
        }
        
        if (prompt.length > 10000) {
            return res.status(400).json({ error: 'Prompt too long (max 10000 characters)' });
        }
        
        // Claude API 키 확인
        const apiKey = process.env.CLAUDE_API_KEY;
        if (!apiKey) {
            console.error('❌ CLAUDE_API_KEY not set');
            return res.status(500).json({ 
                error: 'API key not configured. Please set CLAUDE_API_KEY in Vercel environment variables.' 
            });
        }
        
        console.log(`🤖 ${docType} generation started (${prompt.length} chars)`);
        
        // Claude API 호출
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 4096,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error(`❌ Claude API error: ${response.status}`, errorData);
            
            return res.status(response.status).json({ 
                error: `Claude API error: ${response.status}`,
                details: errorData.error?.message || 'Unknown error'
            });
        }
        
        const data = await response.json();
        const content = data.content[0].text;
        
        console.log(`✅ ${docType} generated successfully (${content.length} chars)`);
        
        return res.status(200).json({
            success: true,
            content: content,
            docType: docType,
            length: content.length
        });
        
    } catch (error) {
        console.error('❌ Server error:', error);
        
        return res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
};