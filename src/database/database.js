import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('hymns.db');


export const initDatabase = () => {
        db.transaction((tx) => {
            /** <h3> Drop table */
            // tx.executeSql('DROP TABLE IF EXISTS hymns');
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS hymns
                 (
                     id       INTEGER PRIMARY KEY AUTOINCREMENT,
                     number   INTEGER UNIQUE,
                     title    TEXT,
                     stanzas  TEXT,
                     refrains TEXT
                 )`
            );
        });
    };

initDatabase();

export const insertHymn = async (hymn) => {
    return new Promise((resolve, reject) => {
        const stanzasJSON = JSON.stringify(hymn.stanzas);
        const refrainsJSON = JSON.stringify(hymn.refrains);

        db.transaction(
            (tx) => {
                tx.executeSql(
                    'INSERT INTO hymns (number, title, stanzas, refrains) VALUES (?, ?, ?, ?)',
                    [hymn.number, hymn.title, stanzasJSON, refrainsJSON],
                    (_, { insertId }) => {
                        resolve(insertId);
                    },
                    (_, error) => reject(error)
                );
            },
            (error) => console.log('Transaction Error:', error)
        );
    });
};

export const getHymns = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM hymns',
                    [],
                    (_, { rows }) => {
                        const hymns = rows._array.map((hymn) => {
                            return {
                                ...hymn,
                                stanzas: JSON.parse(hymn.stanzas),
                                refrains: JSON.parse(hymn.refrains)
                            };
                        });
                        resolve(hymns);
                    },
                    (_, error) => reject(error)
                );
            },
            (error) => console.log('Transaction Error:', error)
        );
    });
};

export const closeDb = () => {
    return new Promise((resolve, reject) => {
        db._db.close((error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};


let preloadedHymns = null;

export const preloadHymns = async () => {
    if (preloadedHymns) {
        return preloadedHymns;
    }

    preloadedHymns = await getHymns();
    return preloadedHymns;
};
