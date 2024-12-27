// postgresql://neondb_owner:5rgtjPCNcdl2@ep-ancient-snow-a5ko83f5.us-east-2.aws.neon.tech/zero3hero?sslmode=require

import { neon} from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as dbConfig from './schema'; 

const sql = neon(process.env.DATABASE_URl)

export const db = drizzle(sql, {schema: dbConfig})


