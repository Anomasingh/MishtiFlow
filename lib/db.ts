import { Client } from "pg"

const connectionString = process.env.DATABASE_URL

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const client = new Client({ connectionString })
  try {
    await client.connect()
    const result = await client.query(text, params)
    return result.rows
  } finally {
    await client.end()
  }
}

export async function queryOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(text, params)
  return rows[0] || null
}
