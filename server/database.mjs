import { mkdir, chmod } from 'node:fs/promises'
import { resolve } from 'node:path'

const schema = [
`CREATE TABLE IF NOT EXISTS admins (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL, password_hash TEXT, created_at TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS activation_tokens (token_hash TEXT PRIMARY KEY, admin_id TEXT NOT NULL REFERENCES admins(id) ON DELETE CASCADE, expires_at BIGINT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, admin_id TEXT NOT NULL REFERENCES admins(id) ON DELETE CASCADE, csrf TEXT NOT NULL, expires_at BIGINT NOT NULL, absolute_expiry BIGINT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS interests (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, phone TEXT NOT NULL, cohort TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'novo' CHECK(status IN ('novo','contatado','qualificado','arquivado')), notes TEXT NOT NULL DEFAULT '', consent_at TEXT NOT NULL, consent_text TEXT NOT NULL, source TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS processes (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', starts_at TEXT NOT NULL, ends_at TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('preparacao','ativo','encerrado')), created_at TEXT NOT NULL, updated_at TEXT NOT NULL, CHECK(starts_at <= ends_at))`,
`CREATE TABLE IF NOT EXISTS applications (id TEXT PRIMARY KEY, interest_id TEXT NOT NULL REFERENCES interests(id) ON DELETE CASCADE, process_id TEXT NOT NULL REFERENCES processes(id) ON DELETE RESTRICT, status TEXT NOT NULL DEFAULT 'recebida' CHECK(status IN ('recebida','em_analise','aprovada','lista_espera','reprovada','cancelada')), notes TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL, UNIQUE(interest_id, process_id))`,
`CREATE TABLE IF NOT EXISTS history (id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, action TEXT NOT NULL, actor TEXT NOT NULL, created_at TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, resets_at BIGINT NOT NULL)`,
`CREATE INDEX IF NOT EXISTS interests_date_idx ON interests(created_at)`,
`CREATE INDEX IF NOT EXISTS applications_process_idx ON applications(process_id)`,
`CREATE INDEX IF NOT EXISTS history_entity_idx ON history(entity_type,entity_id,created_at)`,
`CREATE INDEX IF NOT EXISTS session_expiry_idx ON sessions(expires_at)`
]

export async function openDatabase({ url = process.env.DATABASE_URL, path = process.env.DATABASE_PATH || './data/gestcorp', memory = false } = {}) {
  let adapter
  if (url) {
    if (!/^postgres(ql)?:\/\//.test(url)) throw new Error('DATABASE_URL deve ser uma conexão PostgreSQL Neon.')
    const { neon } = await import('@neondatabase/serverless')
    const sql = neon(url)
    adapter = {
      query: async (text, params = []) => ({ rows: await sql.query(text, params) }),
      batch: async (statements) => (await sql.transaction(statements.map(([text,params=[]]) => sql.query(text,params)))).map(rows => ({rows})),
      close: async () => {},
    }
  } else {
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') throw new Error('Configure DATABASE_URL. Banco local é proibido em produção.')
    const { PGlite } = await import('@electric-sql/pglite')
    if (!memory) { await mkdir(resolve(path), { recursive: true, mode: 0o700 }); await chmod(resolve(path),0o700) }
    const pg = new PGlite(memory ? undefined : resolve(path))
    await pg.waitReady
    adapter = {
      query: (text, params = []) => pg.query(text, params),
      batch: statements => pg.transaction(async tx => {
        const results = []
        for (const [text, params=[]] of statements) results.push(await tx.query(text,params))
        return results
      }),
      close: () => pg.close(),
    }
  }
  await adapter.batch([...(url ? [['SELECT pg_advisory_xact_lock(4262027)']] : []), ...schema.map(sql=>[sql])])
  return adapter
}
let database
export function getDatabase() {
  if (!database) database = openDatabase().catch(error=> { database=undefined; throw error })
  return database
}
