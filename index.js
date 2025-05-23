import express from 'express';
import sql from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';

// 載入環境變數
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 自定義 CORS 配置
app.use(cors({
  origin: ['http://localhost:5173', 'https://你的域名.com'], // 允許的來源
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允許的 HTTP 方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允許的請求頭
  credentials: true // 允許攜帶憑證
}));

app.get('/', async (req, res) => {
  try {
    // 測試資料庫連接
    const result = await sql`SELECT NOW()`;
    res.json({
      message: '成功連接到 Supabase 資料庫',
      serverTime: result[0].now
    });
  } catch (error) {
    console.error('資料庫連接錯誤:', error);
    res.status(500).json({
      message: '無法連接到資料庫',
      error: error.message
    });
  }
});

// 獲取所有用戶資訊 (可以 supabase 的 SQL Editor 自己新增 Table)
app.get('/users', async (req, res) => {
  try {
    // 查詢 Users 表的所有資料
    const users = await sql`SELECT * FROM Users`;
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('獲取用戶資料錯誤:', error);
    res.status(500).json({
      success: false,
      message: '無法獲取用戶資料',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`伺服器運行在 http://localhost:${PORT}`);
});
