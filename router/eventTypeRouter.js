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
  //const id = req.params.Id;
  const id = req.params.id;
  //ככה זה צריך להיות
  // const queryString = `UPDATE catering.eventtype SET Active =False WHERE Id=${id}`
  console.log(id);
  try {
    const queryString = `UPDATE catering.eventtype SET Active =False WHERE Id=${id}`
    const row=await promiseQuery(queryString);
   // בדיקה אם זה עודכן ללא פעיל
    // const queryString2=`select * from catering.eventtype where Id=${id}`
    // const row2=await promiseQuery(queryString);
    // if(row2[0].Active==False)
    // res.send("סוג האירוע נמחק");
    // else
    // res.send("סוג האירוע לא נמחק");
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
    const queryString = `INSERT INTO catering.eventtype  VALUES (0,"${nameEventType.Name}",True,"${nameEventType.Details}")`;
    const row = await promiseQuery(queryString);
    //לבדוק אם האירוע הוסף
    res.send("סוג האירוע הוסף בהצלחה");
  } catch (err) {
    //לאחר פונקצייה זו יגש לפונקציות אחרות שיבנו לו את התפריט לאירוע החדש שהוסף
    console.log(err);
    res.send(err);
  }
});

//4
//שינוי או תיקון שם סוג האירוע
routerEventType.put("/updateNameEventType/:id", async (req, res) => {
  //מקבלת אי די של סוג אירוע
  const id = req.params.id;
  const newName = req.body;
  try {
    const queryString = `UPDATE catering.eventtype SET Name ="${newName.Name}" WHERE Id=${id};`;

  //לבדוק אם באמת השתנה השם
  //-----------------------------
  res.send("שם סוג האירוע עודכן");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});



//5
//שינוי או תיקון תיאור האירוע  
routerEventType.put("/updateDetailsEventType/:id", async (req, res) => {
  //מקבלת אי די של סוג אירוע
  const id = req.params.id;
  const newDetails = req.body;
  try {
    const queryString = `UPDATE catering.eventtype SET Details ="${newDetails.Details}" WHERE Id=${id};`;

  //לבדוק אם באמת השתנה השם
  //-----------------------------
  res.send("תיאור עודכן");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//ייצוא הראוטר
module.exports = { routerEventType };
