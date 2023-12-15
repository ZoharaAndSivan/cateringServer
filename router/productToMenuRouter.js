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
    const queryString = `SELECT ptm.Id, ptm.FoodId, ptm.MenuTypeId, ptm.Active, mt.FoodTypeId, f.Name, f.Price, f.Image
    FROM producttomenu ptm
    INNER JOIN menutype mt ON ptm.MenuTypeId = mt.Id
    INNER JOIN menueventtype met ON mt.MenuId = met.Id
    INNER JOIN foods f ON ptm.FoodId = f.Id
    WHERE met.Id=${menuId} and f.Active=True and ptm.Active=True`;
    let row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});


//הוספת מאכל מסויים לתפריט מסויים
//פירוט















//ייצוא הראוטר
module.exports = { routerProductToMenu };