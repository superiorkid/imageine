import * as schema from "@/db/schema";
import { env } from "@/env";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
const db = drizzle(pool, { schema });
export default db;
