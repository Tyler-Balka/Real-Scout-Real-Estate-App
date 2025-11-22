import * as SQLite from 'expo-sqlite';

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
            await db.execAsync(
                `CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT UNIQUE,
                    profile_picture TEXT
                );`
            );
            console.log('User table created successfully');
        }
    } catch (error) {
        console.error('Error creating user table:', error);
    }
}

const insertIntoUserTable = async (name, email, profilePicture) => {
    try {
        const db = await createDatabase();
        if (db){
            await db.runAsync(
                `INSERT OR REPLACE INTO users (name, email, profile_picture) VALUES (?, ?, ?)`,
                name, email, profilePicture
            );
            console.log('User inserted successfully:', 
                { 
                    name: name, 
                    email: email 
                });
        }
    } catch (error) {
        console.error('Error inserting into user table: ', error);
    }
}

const fetchUsers = async (email) => {
    try {
        const db = await createDatabase();
        if (db){
            const results = await db.getAllAsync(`SELECT * FROM users WHERE email = ?`, email);
            return results;
        }
    } catch (error) {
        console.error('Error fetching users: ', error);
    }
}

export { createDatabase, createUserTable, insertIntoUserTable, fetchUsers };
