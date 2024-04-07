import * as SQLite from 'expo-sqlite';

// Open the SQLite database connection
const db = SQLite.openDatabase('hymns.db');

// Function to initialize the database
export const initDatabase = () => {
    db.transaction(tx => {
        // Create tables if they don't exist
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS hymns (id INTEGER PRIMARY KEY AUTOINCREMENT, hymnNumber TEXT, title TEXT)'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS stanzas (id INTEGER PRIMARY KEY AUTOINCREMENT, hymnId INTEGER, number TEXT, text TEXT, FOREIGN KEY (hymnId) REFERENCES hymns(id))'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS refrains (id INTEGER PRIMARY KEY AUTOINCREMENT, hymnId INTEGER, number TEXT, text TEXT, FOREIGN KEY (hymnId) REFERENCES hymns(id))'
        );
    }, handleTransactionError, handleTransactionSuccess);
};

// Function to add a hymn to the database with individual input fields
export const addHymn = async (hymnNumber, title, stanzas, refrains) => {
    let retryCount = 0;
    const MAX_RETRIES = 3;

    try {
        await db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO hymns (hymnNumber, title) VALUES (?, ?)',
                [hymnNumber, title],
                (_, { insertId }) => {
                    // Add stanzas
                    stanzas.forEach(stanza => {
                        tx.executeSql(
                            'INSERT INTO stanzas (hymnId, number, text) VALUES (?, ?, ?)',
                            [insertId, stanza.number, stanza.text]
                        );
                    });
                    // Add refrains
                    refrains.forEach(refrain => {
                        tx.executeSql(
                            'INSERT INTO refrains (hymnId, number, text) VALUES (?, ?, ?)',
                            [insertId, refrain.number, refrain.text]
                        );
                    });
                }
            );
        });
    } catch (error) {
        if (error.message.includes('database is locked') && retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`Retrying database operation (attempt ${retryCount})`);
            await new Promise(resolve => setTimeout(resolve, 500)); // Retry after 500ms
            await addHymn(hymnNumber, title, stanzas, refrains);
        } else {
            handleTransactionError(error);
        }
    }
};

// Function to update a hymn in the database
export const updateHymn = async (hymnId, hymnNumber, title, stanzas, refrains) => {
    let retryCount = 0;
    const MAX_RETRIES = 3;

    try {
        await db.transaction(tx => {
            // Update hymn information
            tx.executeSql(
                'UPDATE hymns SET hymnNumber = ?, title = ? WHERE id = ?',
                [hymnNumber, title, hymnId]
            );

            // Delete existing stanzas and refrains
            tx.executeSql('DELETE FROM stanzas WHERE hymnId = ?', [hymnId]);
            tx.executeSql('DELETE FROM refrains WHERE hymnId = ?', [hymnId]);

            // Add new stanzas and refrains
            stanzas.forEach(stanza => {
                tx.executeSql(
                    'INSERT INTO stanzas (hymnId, number, text) VALUES (?, ?, ?)',
                    [hymnId, stanza.number, stanza.text]
                );
            });
            refrains.forEach(refrain => {
                tx.executeSql(
                    'INSERT INTO refrains (hymnId, number, text) VALUES (?, ?, ?)',
                    [hymnId, refrain.number, refrain.text]
                );
            });
        });
    } catch (error) {
        if (error.message.includes('database is locked') && retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`Retrying database operation (attempt ${retryCount})`);
            await new Promise(resolve => setTimeout(resolve, 500)); // Retry after 500ms
            await updateHymn(hymnId, hymnNumber, title, stanzas, refrains);
        } else {
            handleTransactionError(error);
        }
    }
};

// Function to delete a hymn from the database
export const deleteHymn = async (hymnId) => {
    let retryCount = 0;
    const MAX_RETRIES = 3;

    try {
        await db.transaction(tx => {
            // Delete associated stanzas and refrains
            tx.executeSql('DELETE FROM stanzas WHERE hymnId = ?', [hymnId]);
            tx.executeSql('DELETE FROM refrains WHERE hymnId = ?', [hymnId]);

            // Delete the hymn
            tx.executeSql('DELETE FROM hymns WHERE id = ?', [hymnId]);
        });
    } catch (error) {
        if (error.message.includes('database is locked') && retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`Retrying database operation (attempt ${retryCount})`);
            await new Promise(resolve => setTimeout(resolve, 500)); // Retry after 500ms
            await deleteHymn(hymnId);
        } else {
            handleTransactionError(error);
        }
    }
};

// Function to retrieve all hymns from the database
export const getAllHymns = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            `
      SELECT
        h.id AS hymnId,
        h.hymnNumber,
        h.title,
        s.id AS stanzaId,
        s.number AS stanzaNumber,
        s.text AS stanzaText,
        r.id AS refrainId,
        r.number AS refrainNumber,
        r.text AS refrainText
      FROM hymns h
      LEFT JOIN stanzas s ON h.id = s.hymnId
      LEFT JOIN refrains r ON h.id = r.hymnId
      `,
            [],
            (_, { rows }) => {
                const hymns = {};
                rows._array.forEach(row => {
                    if (!hymns[row.hymnId]) {
                        hymns[row.hymnId] = {
                            id: row.hymnId,
                            hymnNumber: row.hymnNumber,
                            title: row.title,
                            stanzas: [],
                            refrains: [],
                        };
                    }

                    if (row.stanzaId) {
                        hymns[row.hymnId].stanzas.push({
                            id: row.stanzaId,
                            number: row.stanzaNumber,
                            text: row.stanzaText,
                        });
                    }

                    if (row.refrainId) {
                        hymns[row.hymnId].refrains.push({
                            id: row.refrainId,
                            number: row.refrainNumber,
                            text: row.refrainText,
                        });
                    }
                });

                callback(Object.values(hymns));
            }
        );
    }, handleTransactionError, handleTransactionSuccess);
};

// Function to close the database connection
export const closeDatabaseConnection = () => {
    db._db.close(); // Close the connection
};

// Function to handle transaction errors
const handleTransactionError = (error) => {
    console.error('Transaction error:', error);
};

// Function to handle transaction success
const handleTransactionSuccess = () => {
    console.log('Transaction completed successfully');
};
