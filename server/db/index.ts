import { Kysely, PostgresDialect } from 'kysely'
import { Pool, neonConfig } from '@neondatabase/serverless'
import type { DB } from '@/prisma/types/types'
import { Pool as PgPool } from 'pg'
import ws from 'ws'

const isNeon = process.env.DATABASE_URL?.includes('neon.tech')

if (isNeon) {
  neonConfig.webSocketConstructor = ws
}

const DialectPool = isNeon ? Pool : PgPool

export const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new DialectPool({
            connectionString: process.env.DATABASE_URL!,
        }),
    }),
})