//סוגי מאכלים

// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerFoodsType = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");

//1
//שליפת כל סוגי המאכלים
routerFoodsType.get("/getAllFoodsType", async (req, res) => {
  try {
    const queryString = `select * from foodstype where Active=True`;
    const rows = await promiseQuery(queryString);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//2
//מחיקת סוג מאכל הפיכתו ללא פעיל
routerFoodsType.put("/updateActive/:id", async (req, res) => {
  //מקבלת אי די של סוג המאכל
  const id = req.params.id;
  try {
    const queryString = `UPDATE catering.foodstype SET Active=False WHERE Id=${id};`;
    const row=await promiseQuery(queryString);
    res.send("סוג המאכל נמחק");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//3
//הוספת סוג מאכל
routerFoodsType.post("/addFoodType", async (req, res) => {
  const nameFoodType = req.body;
  try {
    const queryString = `INSERT INTO catering.foodstype  VALUES (0,"${nameFoodType.Name}",True);`;
    const row = await promiseQuery(queryString);
    res.send("סוג המאכל הוסף בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//4
//שינוי או תיקון שם סוג המאכל
routerFoodsType.put("/updateNameFoodType/:id", async (req, res) => {
  //מקבלת אי די של סוג אירוע
  const id = req.params.id;
  const newName = req.body;
  try {
    const queryString = `UPDATE catering.foodstype SET Name ="${newName.Name}" WHERE Id=${id};`;
    res.send("שם סוג המאכל עודכן");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//ייצוא הראוטר
module.exports = { routerFoodsType };
