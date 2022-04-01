import { Pool } from "pg";
import { API_KEY } from "./config/config";

// PGHOST='localhost'
// PGUSER=process.env.USER
// PGDATABASE=process.env.USER
// PGPASSWORD=null
// PGPORT=5432

const db = new Pool({ connectionString: API_KEY });

export default db;
