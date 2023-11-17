//הזמנות מאכלים
// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerFoodsOrders = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");

//1
//הוספת מאכל להזמנה
//צריך להגיע מערך בהתחלה
routerFoodsOrders.get("/getFoodsOrderByOrderId/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const queryString = `select * from catering.foodsorders where OrderId = ${orderId}`;
    const row = await promiseQuery(queryString);
    for (let i = 0; i < row.length; i++) {
      const element = row[i];
      const queryString2 = `select * from catering.foods where Id = ${element.FoodId}`;
      const food = await promiseQuery(queryString2);
      const queryString3 = `select * from catering.foodstype where Id=${food[0].FoodTypeId}`;
      const typeFood = await promiseQuery(queryString3);
      console.log(typeFood);
      food[0].TypeName = typeFood[0].Name;
      row[i].Food = food[0];
    }
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//2
//הוספת מאכל להזמנה
routerFoodsOrders.post("/addFoodToOrder/:foodId", async (req, res) => {
  const foodId = req.params.foodId;
  try {
    const queryString = `INSERT INTO catering.foodsOrders  VALUES (0,${OrderId},${foodId},null,null);`;
    const row = await promiseQuery(queryString);
    res.send("המאכל הוסף בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//3
//מחיקת מוצר מההזמנה
routerFoodsOrders.put("/deleteFoodFromOrder/:id", async (req, res) => {
  const id = req.params.id;
  const today = null;
  try {
    const queryString = `UPDATE catering.foodsOrders SET ProductCancellation=True WHERE Id=${id}`;
    const row = await promiseQuery(queryString);
    res.send("המאכל נמחק בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//4
//שליפת כל המאכלים מהזמנה  מסוימת
//ProductCancellation=False

//ייצוא הראוטר
module.exports = { routerFoodsOrders };
