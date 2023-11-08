//טבלת משתמשים
// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerUser = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");


//1
//פונקציית התחברות משתמש
routerUser.post("/login", async (req, res) => {
  try {
    //על ידי הקשת מספר טלפון וסיסמא
    //קבלת הנתונים שהמשתמש הקליד
    const details = req.body;
    //שאילתת שליפת משתמש מסוים
    const queryString = `select * from catering.users where Phone="${details.Phone}" and Password="${details.Password}"`;
    const row = await promiseQuery(queryString);
    //בודק אם הוא נמצא
    if (row.length == 0)
      res.send({user:null,messege:"עדיין לא ביצעת הזמנה באתר ! לביצוע הזמנה גש לדף הראשי"});
    else
      res.send({user:row[0],messege:"התחברת בהצלחה!!!"})
  } catch (err) {
    res.send("בעיית התחברות");
  }
});



//2
//פונקציית הוספת משתמש
routerUser.post("/addUser", async (req, res) => {
  try {
    const details = req.body;
    //קבלת הפרטים למשתנים
    const firstName = details.FirstName;
    const lastName = details.LastName;
    const Phone = details.Phone;
    const address = details.Address;
    const email = details.Email;

    //שאילתא שבודקת אם הלקוח הזה כבר רשום
    const queryString = `select * from catering.users where FirstName="${firstName}" and LastName="${lastName}" and Phone="${Phone}" and Address=${address} and Email=${email} and Active=True`;
    const row = await promiseQuery(queryString);
    if (row.length == 0) {
      //קבלת כל האובייקט
      const user = req.body;
      //שאילתא להוספת המשתמש
      //מגרילה לו סיסמא כדי שעל ידה יוכל להכנס לאיזור האישי שלו  
      const randomPassword = Math.floor(Math.random() * 100001);;
      //כאשר הסיסמא לא קיימת מכניסה אותה
      const queryString = `INSERT INTO catering.users VALUES(0,"${user.FirstName}","${user.LastName}","${user.Phone}", "${user.Address}","${user.Email}","${randomPassword}",3,True);`;
      const row = await promiseQuery(queryString);
      res.send("נרשמת בהצלחה!!!");
    } else {
      res.send("אתה כבר רשום! ");
    }
  } catch (err) {
    res.send("תקלה");
  }
});



//3
//הוספת פקיד/ה 
routerUser.post("/addOfficial", async (req, res) => {
  try {
    const details = req.body;
    //קבלת הפרטים למשתנים
    const firstName = details.FirstName;
    const lastName = details.LastName;
    const Phone = details.Phone;
    const address = details.Address;
    const email = details.Email;

    //שאילתא שבודקת אם הלקוח הזה כבר רשום
    const queryString = `select * from catering.users where FirstName="${firstName}" and LastName="${lastName}" and Phone="${Phone}" and Address=${address} and Email=${email} and Active=True`;
    const row = await promiseQuery(queryString);
    if (row.length == 0) {
      //קבלת כל האובייקט
      const user = req.body;
      //שאילתא להוספת המשתמש
      //מגרילה לו סיסמא כדי שעל ידה יוכל להכנס לאיזור האישי שלו
      const randomPassword = Math.floor(Math.random() * 100001);;
      //בודקת אם הסיסמא לא קיימת
      // while (rowPassword == 0) {
      //   let queryString1 = `select * from catering.users where Password="${random}"`;
      //   randomPassword = await promiseQuery(queryString1);
      // }
      //כאשר הסיסמא לא קיימת מכניסה אותה
      const queryString = `INSERT INTO catering.users VALUES(0,"${user.FirstName}","${user.LastName}","${user.Phone}", "${user.Address}","${user.Email}","${randomPassword}",2,True);`;
      const row = await promiseQuery(queryString);
      res.send("הוספת עובד  בהצלחה !!!");
    } else {
      res.send("העובד נמצא כבר  ! ");
    }
  } catch (err) {
    res.send("תקלה");
  }
});



//4
// הפיכת משתמש ללא פעיל
//או עובד
routerUser.put("/updateActive/:id", async (req, res) => {
  const id=req.params.id;
  try{
    const queryString = `UPDATE catering.users SET Active =False where Id="${id}" `
    const row=await promiseQuery(queryString)
    res.send("עודכן ללא פעיל")
  }
  catch(err){
    console.log(err);
    res.send(err);
  }
})



//5
//פונקציית שליפת כל המשתמשים
// routerUser.get("/getAllUser", async (req, res) => {
//   try {
//     //שאילתת שליפת כל המשתמשים
//     const queryString = `select * from catering.users where  and UserType=3`;
//     //מחכה לתוצאות
//     const row = await promiseQuery(queryString);
//     res.send(row);
//   } catch (err) {
//     res.send("תקלה");
//     console.log(err);
//   }
// });


//6
//שליפת כל המשתמשים הפעילים
routerUser.get("/getAllUserActive", async (req, res) => {
  try {
    //שאילתת שליפת כל המשתמשים
    const queryString = `select * from catering.users where Active=True and UserType=3`;
    //מחכה לתוצאות
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    res.send("תקלה");
    console.log(err);
  }
});



//7
//פונקציית שליפת כל העובדים
// routerUser.get("/getAllOfficial", async (req, res) => {
//   try {
//     //שאילתת שליפת כל המשתמשים
//     const queryString = `select * from catering.users  and UserType=2`;
//     //מחכה לתוצאות
//     const row = await promiseQuery(queryString);
//     res.send(row);
//   } catch (err) {
//     res.send("תקלה");
//     console.log(err);
//   }
// });


//8
//שליפת כל העובדים הפעילים
routerUser.get("/getAllOfficialActive", async (req, res) => {
  try {
    //שאילתת שליפת כל המשתמשים
    const queryString = `select * from catering.users where Active=True and UserType=2`;
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
