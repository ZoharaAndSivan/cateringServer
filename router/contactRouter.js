//יצירת קשר 

// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerContact = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");



//1
//פונקציית יצירת קשר
routerContact.post("/addContactUs", async (req, res) => {
  //קבלת הנתונים
    const details = req.body;
  try {  
    //שאילתת הוספה לטבלת צור קשר
    const queryString = `INSERT INTO catering.contact VALUES(0,"${details.FirstName}","${details.LastName}","${details.Phone}","${details.Note}",False);`;
    const row = await promiseQuery(queryString);
    res.send("פרטיך נקלטו בהצלחה!!! ניצור איתך קשר בהקדם");
  } catch (err) {
    console.log(err)
    res.send("קרתה תקלה..");
   
  }
});


// פונקציית אישור יצירת קשר עם לקוח שממתין ליצירת קשר
routerContact.put("/UpdatePerform/:id", async (req, res) => {
  // מקבל את האיי די של הלקוח שאיתו סיים ליצור קשר
  //שקיבל בפרמס
  const userId = req.params.id;
  //שאילתא לחיפוש הלקוח כדי לשנות את השדה
  const queryString = `UPDATE catering.contact SET Perform=True WHERE Id=${userId}`;
  const row = await promiseQuery(queryString);
  res.send("נוצר קשר עם הלקוח");
});




//שליפת יצירת קשר שלא בוצעו
routerContact.get("/getAllContactNotPerform", async (req, res) => {
    try {
     
      const queryString = `select * from catering.contact where Perform=False`;
      //מחכה לתוצאות
      const row = await promiseQuery(queryString);
      res.send(row);
    } catch (err) {
      res.send("תקלה");
      console.log(err);
    }
  });
  










//ייצוא הראוטר
module.exports = { routerContact };
