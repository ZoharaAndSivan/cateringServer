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
  console.log(id);
  try {
    const queryString = `select * from catering.foods where Active=True and FoodTypeId=${id}`;
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
  const food = req.body;
  try {
    //-----------לבדוק אם המאכל הזה כבר קיים-----------------
    const queryString = `INSERT INTO catering.foods  VALUES (0,"${food.Name}",${food.FoodTypeId},"${food.Price}","${food.Image}",True);`;
    const row = await promiseQuery(queryString);
    food.Id = row.insertId;

    res.send(food);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//מחיקת מאכל
routerFood.put("/updateActive/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryString = `UPDATE catering.foods SET Active =False WHERE Id=${id}`;
    const row = await promiseQuery(queryString);
    const queryString2 = `select * from catering.foodsorders where FoodId=${id}`;
    const row2 = await promiseQuery(queryString2);
    for (let i = 0; i < row2.length; i++) {
      const item = row2[i];
      const queryString3 = `select * from catering.orders where Id=${item.OrderId}`;
      const row3 = await promiseQuery(queryString3);
      const queryString4 = `INSERT INTO catering.cancellation  VALUES (0,${id},${row3[0].UserId},"",False);`;
      const row4 = await promiseQuery(queryString4);
    }
    res.send("המאכל נמחק בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//3
//עדכון מחיר המאכל
//עדכון המחיר של המאכל שהוא בתוספת תשלום למחיר המנה הכוללת
// routerFood.put("/updatePrice/:id", async (req, res) => {
//   const id=req.params.id
//   const newPrice=req.body
//   try{
//     const queryString = `UPDATE catering.foods SET Price =${newPrice.Price} WHERE Id=${id}`
//     const row=await promiseQuery(queryString)
//     res.send("מחיר המאכל עודכן בהצלחה")
//   }
//   catch(err)
//   {
//     console.log(err)
//     res.send(err)
//   }
// })

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

// routerFood.put("/updateFoodTypeId/:id", async (req, res) => {
//   const id=req.params.id
//   const newFoodType=req.body
//   try{
//     const queryString = `UPDATE catering.foods SET FoodTypeId =${newFoodType.Id} WHERE Id=${id}`
//     const row=await promiseQuery(queryString)
//     res.send("סוג המאכל עודכן בהצלחה")
//   }
//   catch(err)
//   {
//     console.log(err)
//     res.send(err)
//   }
// })

//6
//כל העדכונים
routerFood.put("/updateAll/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const queryString = `UPDATE catering.foods SET Price =${body.Price},FoodTypeId =${body.Id} WHERE Id=${id}`;
    const row = await promiseQuery(queryString);
    res.send("סוג המאכל עודכן בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//החלפת תמונה
//--------

//ייצוא הראוטר
module.exports = { routerFood };
