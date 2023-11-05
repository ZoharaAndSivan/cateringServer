// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerUser = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");



//פונקציית התחברות משתמש
routerUser.post("/Login", async (req, res) => {
  try {
    //על ידי הקשת שם מלא וסיסמא
    //קבלת הנתונים שהמשתמש הקליד
    const details = req.body;
    //שאילתת שליפת משתמש מסוים
    const queryString = `select * from catering.users where FirstName="${details.FirstName}" and LastName="${details.LastName}" and Password="${details.Password}"`;
    const row = await promiseQuery(queryString);
    //בודק אם הוא נמצא-אם כבר התחבר בעבר
    if (row.length == 0) res.send("לא ביצעת הזמנות באתר  ");
    else res.send("התחברת בהצלחה!!!");
  } catch (err) {
    res.send("בעיית התחברות");
  }
});

//פונקצייה שבודקת אם המשתמש כבר רשום
routerUser.get("/IsRegister", async (req, res) => {
  try {
    const details = req.body;
    //קבלת הפרטים למשתנים
    const firstName = details.FirstName;
    const lastName = details.LastName;
    const fhone = details.Fhone;
    const address = details.Address;
    const email = details.Email;

    //שאילתא שבודקת אם הלקוח הזה כבר רשום
    const queryString = `select * from catering.users where FirstName="${firstName}" and LastName="${lastName}" and Fhone="${fhone}" and Address=${address} and Email=${email}`;
    const row = await promiseQuery(queryString);
    if (row.length == 0) {
      //קבלת כל האובייקט
      const user = req.body;
      //שאילתא להוספת המשתמש
      //מגרילה לו סיסמא כדי שעל ידה יוכל להכנס לאיזור האישי שלו
      //-------------------------------------

      const random = null;
      let rowPassword = 0;
      //בודקת אם הסיסמא לא קיימת
      while (rowPassword == 0) {
        let queryString1 = `select * from catering.users where Password="${random}"`;
        rowPassword = await promiseQuery(queryString1);
      }
      //כאשר הסיסמא לא קיימת מכניסה אותה
      const queryString = `INSERT INTO catering.users VALUES(0,"${user.FirstName}","${user.LastName}","${user.Fhone}", "${user.Address}","${user.Email}","${random}",2);`;
      const row = await promiseQuery(queryString);
      res.send("נרשמת בהצלחה!!!");
    } else {
      res.send("אתה כבר רשום! ");
    }
  } catch (err) {
    res.send("תקלה");
  }
});


//פונקציית שליפת כל המשתמשים
routerUser.get("/getAllUser", async (req, res) => {
  try {
    //שאילתת שליפת כל המשתמשים
    const queryString = `select * from catering.users`;
    //מחכה לתוצאות
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    res.send("תקלה");
    console.log(err);
  }
});
















//ייצוא הראוטר
module.exports = { routerUser };
