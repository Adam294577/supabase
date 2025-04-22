import postgres from 'postgres'
import dotenv from 'dotenv'
// 載入環境變數
dotenv.config()
const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connection: {
    options: `--pool_mode=transaction`
  }
})
export default sql