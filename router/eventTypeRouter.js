//סוג אירוע

// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerEventType = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");

//1
//שליפת כל סוגי האירועים
routerEventType.get("/getAllEventType", async (req, res) => {
  try {
    //שאילתת שליפת כל סוגי האירועים שהם פעילים
    const queryString = `select * from catering.eventtype where Active=True`;
    //מחכה לתוצאות
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    res.send("תקלה");
    console.log(err);
  }
});

//2
//מחיקת סוג אירוע-הפיכתו ללא פעיל
routerEventType.put("/updateActive/:id", async (req, res) => {
  //מקבלת אי די של סוג אירוע
  const id = req.params.id;
  console.log(id);
  try {
    const queryString = `UPDATE catering.eventtype SET Active=False WHERE Id=${id}`
    const row=await promiseQuery(queryString);
    res.send("סוג האירוע נמחק");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//3
//הוספת סוג אירוע
routerEventType.post("/addEventType", async (req, res) => {
  const nameEventType = req.body;
  try {
    const queryString = `INSERT INTO catering.eventtype  VALUES (0,"${nameEventType.Name}","${nameEventType.Details}","${nameEventType.Image}",True)`;
    const row = await promiseQuery(queryString);
    nameEventType.Id= row.insertId;
    res.send(nameEventType);

  } catch (err) {
    //לאחר פונקצייה זו יגש לפונקציות אחרות שיבנו לו את התפריט לאירוע החדש שהוסף
    console.log(err);
    res.send(err);
  }
});

// //4
// //שינוי או תיקון שם סוג האירוע
routerEventType.put("/updateNameEventType/:id", async (req, res) => {
  //מקבלת אי די של סוג אירוע
  const id = req.params.id;
  const newName = req.body;
  try {
    const queryString = `UPDATE catering.eventtype SET Name ="${newName.Name}" WHERE Id=${id};`
    const row = await promiseQuery(queryString);
  res.send("שם סוג האירוע עודכן");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});



// //5
// //שינוי או תיקון תיאור האירוע  
// routerEventType.put("/updateDetailsEventType/:id", async (req, res) => {
//   //מקבלת אי די של סוג אירוע
//   const id = req.params.id;
//   const newDetails = req.body;
//   try {
//     const queryString = `UPDATE catering.eventtype SET Details ="${newDetails.Details}" WHERE Id=${id};`
//     const row = await promiseQuery(queryString);
//   res.send("תיאור עודכן");
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });


//6

//שינוי או תיקון    
routerEventType.put("/update/:id", async (req, res) => {
  //מקבלת אי די של סוג אירוע
  const id = req.params.id;
  const body = req.body;
  try {
    const queryString = `UPDATE catering.eventtype SET Name ="${body.Name}",Details ="${body.Details}", Image="${body.Image}", Active=${body.Active} WHERE Id=${id};`
    const row = await promiseQuery(queryString);
  res.send("תיאור עודכן");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//ייצוא הראוטר
module.exports = { routerEventType };
