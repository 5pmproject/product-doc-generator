// api/generate.js
module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt, docType } = req.body;

        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        if (prompt.length > 10000) {
            return res.status(400).json({ error: 'Prompt too long' });
        }

        if (!process.env.CLAUDE_API_KEY) {
            console.error('CLAUDE_API_KEY not set');
            return res.status(500).json({ error: 'API key not configured' });
        }

        console.log('Generating document:', docType);

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 4096,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('Claude API Error:', response.status, error);
            return res.status(response.status).json({ 
                error: 'Claude API error: ' + response.status 
            });
        }

        const data = await response.json();
        console.log('Document generated successfully');

        return res.status(200).json({
            success: true,
            content: data.content[0].text,
            docType: docType
        });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
};