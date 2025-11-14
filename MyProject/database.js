import SQLite, { SQLiteDatabase } from 'expo-sqlite';

const createDatabase = async () => {
    try {
        let db = null;
        if (!db) {
            db = await SQLite.openDatabaseAsync('MY_DATABASE');
        }
        return db;
    } catch (error) {
        console.error('Error creating database:', error);
    }
}

const createUserTable = async () => {
    try {
        const db = await createDatabase();
        if (db){
            db.execAsync(
                `CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT UNIQUE,
                    profile_picture TEXT
                );`
            )
        }
    } catch (error) {
        console.error('Error creating user table:', error);
    }
}
