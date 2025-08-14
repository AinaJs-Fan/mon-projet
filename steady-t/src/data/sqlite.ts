import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDb() {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('steady-t.db');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      age INTEGER,
      height_cm INTEGER,
      waist_cm INTEGER,
      equipment TEXT,
      sleep_goal_hours REAL,
      goals TEXT
    );
    CREATE TABLE IF NOT EXISTS workout_logs (
      id TEXT PRIMARY KEY NOT NULL,
      date TEXT NOT NULL,
      session_id TEXT,
      exercise TEXT NOT NULL,
      load REAL,
      reps INTEGER,
      rpe REAL
    );
    CREATE TABLE IF NOT EXISTS check_ins (
      date TEXT PRIMARY KEY NOT NULL,
      sleep_hours REAL,
      alcohol_units REAL,
      protein_grams REAL,
      notes TEXT
    );
    CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);
  return db;
}

export async function upsertContent(key: string, value: unknown) {
  const database = await getDb();
  await database.runAsync('INSERT OR REPLACE INTO content (key, value) VALUES (?, ?)', [key, JSON.stringify(value)]);
}

export async function getContent<T = unknown>(key: string): Promise<T | null> {
  const database = await getDb();
  const row = await database.getFirstAsync<{ value: string }>('SELECT value FROM content WHERE key = ?', [key]);
  if (!row) return null;
  try {
    return JSON.parse(row.value) as T;
  } catch {
    return null;
  }
}