const util = require("util");
const mysql = require("mysql2");

//הגדרת חיבור לדאטה בייס
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12123434",
  database: "catering",
  multipleStatements: true,
});

const promiseQuery = (sql) => {
  //אבטחת מידע וקריאה ושליחת הנתונים לדאטה בייס
  return util.promisify(mysqlConnection.query).call(mysqlConnection, sql);
};

//ייצוא האס קיו אל
module.exports = { mysqlConnection, promiseQuery };
