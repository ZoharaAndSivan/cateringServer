// מוצר לתפריט
// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerProductToMenu = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");



routerProductToMenu.get("/getAllFoodByMenuId/:menuId", async (req, res) => {
  try {
    const { menuId } = req.params;
    const queryString = `select * from catering.producttomenu where  MenuTypeId=${menuId}`;
    let row = await promiseQuery(queryString);
    const queryString2 = `select * from catering.foods`;
    let food = await promiseQuery(queryString2);
    console.log(row);
    let arr = [];
    for (let index = 0; index < row.length; index++) {
      const element = food.find((x) => row[index].FoodId == x.Id);
      console.log(element);
      if (element) arr = [...arr, element];
    }
    res.send(arr);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});


//הוספת מאכל מסויים לתפריט מסויים
//פירוט















//ייצוא הראוטר
module.exports = { routerProductToMenu };