import { Kysely } from 'kysely'
import { NeonDialect } from 'kysely-neon'
import { neon } from '@neondatabase/serverless'
import type { DB } from '@/prisma/types/types'

export const db = new Kysely<DB>({
    dialect: new NeonDialect({
        neon: neon(process.env.DATABASE_URL!),
    }),
})