//מאכלים
// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerFood = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");

//1
//שליפת מאכלים לפי סוג
routerFood.get("/getAllFoodById/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const queryString = `select * from catering.foods where Active=True and FoodType=${id}`;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


//2
//הוספת מאכל
routerFood.post("/addFood", async (req, res) => {
  const food=req.body;
  try{

    //-----------לבדוק אם המאכל הזה כבר קיים-----------------
    const queryString=`INSERT INTO catering.foods  VALUES (0,"${food.Name}",${food.FoodType},True,"${food.Price}");`
    const row=await promiseQuery(queryString)
    res.send("המאכל הוסף בהצלחה")
  }
  catch(err)
  {
    console.log(err)
    res.send(err)
  }
})

//מחיקת מאכל
routerFood.post("/updateActive/:id", async (req, res) => {
  const id=req.params.id
  try{
    const queryString = `UPDATE catering.foods SET Active =False WHERE Id=${id}`
    const row=await promiseQuery(queryString)
    res.send("המאכל נמחק בהצלחה")
  }
  catch(err)
  {
    console.log(err)
    res.send(err)
  }
})


//3
//עדכון מחיר המאכל 
//עדכון המחיר של המאכל שהוא בתוספת תשלום למחיר המנה הכוללת
routerFood.post("/updatePrice/:id", async (req, res) => {
  const id=req.params.id
  const newPrice=req.body
  try{
    const queryString = `UPDATE catering.foods SET Price =${newPrice.Price} WHERE Id=${id}`
    const row=await promiseQuery(queryString)
    res.send("מחיר המאכל עודכן בהצלחה")
  }
  catch(err)
  {
    console.log(err)
    res.send(err)
  }
})


//4
//שליפת כל המאכלים
routerFood.get("/getAllFood", async (req, res) => {
  
  try {
    const queryString = `select * from catering.foods where Active=True`;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


//5
//שינוי קטגוריה של סוג מאכל

routerFood.post("/updatePrice/:id", async (req, res) => {
  const id=req.params.id
  const newFoodType=req.body
  try{
    const queryString = `UPDATE catering.foods SET FoodType =${newFoodType.Id} WHERE Id=${id}`
    const row=await promiseQuery(queryString)
    res.send("סוג המאכל עודכן בהצלחה")
  }
  catch(err)
  {
    console.log(err)
    res.send(err)
  }
})









//ייצוא הראוטר
module.exports = { routerFood };
