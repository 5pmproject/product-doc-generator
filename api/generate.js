// api/generate.js
// ❌ 이런 설정이 있다면 제거
// export const config = { runtime: 'nodejs18.x' }

// ✅ 올바른 형태
export default async function handler(req, res) {
    // CORS 설정
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    try {
      // 테스트용 응답
      res.status(200).json({ 
        message: 'API is working!', 
        method: req.method,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  