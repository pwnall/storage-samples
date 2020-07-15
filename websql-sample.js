'use strict';

// Slide 1

async function runSql(database, sql, inputs = [], readOnly = false) {
  const methodName = readOnly ? 'readTransaction' : 'transaction';
  return new Promise((resolve, reject) => {
    let resultSet = null;
    database[methodName](transaction => {
      transaction.executeSql(sql, inputs, (_, result) => resultSet = result,
                             (_, error) => reject(error));
    }, reject, () => resolve(resultSet));
  });
}

async function openWebSql(dbName, displayName) {
  const database = openDatabase(dbName, '1.0', displayName, 1048576);
  await runSql(database,
      'CREATE TABLE IF NOT EXISTS data(key STRING PRIMARY KEY, value BLOB)');
  return database;
}

// Slide 2

async function writeWebSqlKey(db, key, value) {
  await runSql(db, 'INSERT OR REPLACE INTO data VALUES(?, ?)', [key, value]);
}

async function readWebSqlKey(db, key) {
  const resultSet =
      await runSql(db, 'SELECT value FROM data WHERE key = ?', [key], true);
  return resultSet.rows[0] && resultSet.rows[0].value;
}

(async () => {
  const database = await openWebSql('database', 'WebSQL Database');
  await writeWebSqlKey(database, 'userid', 'pwnall');
  await writeWebSqlKey(database, 'hello', 'world');
  console.log(await readWebSqlKey(database, 'userid'));
})();
