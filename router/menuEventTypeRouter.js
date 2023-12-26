//תפריטים לסוג אירוע

// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerMenuEventType = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");

//1
// שליפה של כל התפריטים לסוגי אירועי
routerMenuEventType.get("/getAllMenuEventType", async (req, res) => {
  try {
    const queryString = `SELECT * FROM catering.menueventtype`;
    const rows = await promiseQuery(queryString);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//2
//שליפת כל התפריטים לאירוע מסויים
routerMenuEventType.get("/getAllMenuByEventTypeId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryString = `SELECT * FROM catering.menueventtype where Active=True and EventId=${id}`;
    rows = await promiseQuery(queryString);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// //3
// //עדכון מחיר למנה
// routerMenuEventType.put("/updatePrice/:id",async(req,res)=>{
//     const id=req.params.id
//     const newPrice=req.body.Price
//     try{
//         const queryString=`UPDATE catering.menueventtype SET Price ="${newPrice}" WHERE Id=${id};`
//         row=await promiseQuery(queryString)
//         res.send("המחיר עודכן בהצלחה")
//     }
//     catch(err)
//     {
//         console.log(err)
//         res.send(err)
//     }
// })

//4
//עדכון מינימום אנשים
// routerMenuEventType.put("/updateMinimumPeople/:id",async(req,res)=>{
//     const id=req.params.id
//     const newMinimumPeople=req.body.MinimumPeople
//     try{
//         const queryString=`UPDATE catering.menueventtype SET MinimumPeople ="${newMinimumPeople}" WHERE Id=${id};`
//         row=await promiseQuery(queryString)
//         res.send("מספר מינימום האנשים עודכן עודכן בהצלחה")
//     }
//     catch(err)
//     {
//         console.log(err)
//         res.send(err)
//     }
// })

//5
//מחיקת כל התפריטים מאירוע שלם שנמחק
//לדוגמא אם מחקתי ברית אז הוא מוחק את כל התפריטם של ברית
routerMenuEventType.put("/updateActive/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryString = `UPDATE catering.menueventtype SET Active =False WHERE Id=${id}`;
    const row = await promiseQuery(queryString);
    res.send("סוג התפריט נמחק בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//6
//מחיקת כל תפריט אחד
//לדוגמט יש לי 3 תפריטם של בר מצווה אז אני מוחקת את אחד מהם לדוגמא את התפריט הבינוני
routerMenuEventType.put("/updateActive/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const queryString = `UPDATE catering.menueventtype SET Active =False WHERE Id=${id}`;
    const row = await promiseQuery(queryString);
    res.send("סוג התפריט נמחק בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//7
//הוספת תפריט נוסף לסוג אירוע
routerMenuEventType.post("/addMenuEventType", async (req, res) => {
  const { menuEventType, productsToMenu, menuType } = req.body;
  try {
    const queryString = `INSERT INTO catering.menueventtype  VALUES (0,${menuEventType.EventId},"${menuEventType.Name}","${menuEventType.MinimumPeople}","${menuEventType.Price}",True)`;
    const row = await promiseQuery(queryString);
    const menuId = row.insertId;
    for (let i = 0; i < menuType.length; i++) {
      const queryString2 = `INSERT INTO catering.menutype VALUES (0,${menuId},${menuType[i].FoodTypeId},${menuType[i].Amount},${menuType[i].ExtraPrice},0,True)`;
      const row2 = await promiseQuery(queryString2);
      const menuTypeId = row2.insertId;
      const arr = productsToMenu.filter(x => x.FoodTypeId == menuType[i].FoodTypeId);
      for (let j = 0; j < arr.length; j++) {
        const queryString3 = `INSERT INTO catering.producttomenu VALUES (0,${arr[j].FoodId},${menuTypeId},True)`;
        const row3 = await promiseQuery(queryString3); 
      }
    }
    res.send("התווסף בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//8
//עדכון  שם התפריט המשני לסוג אירוע
routerMenuEventType.put("/updateName/:id", async (req, res) => {
  const id = req.params.id;
  const newName = req.body.Name;
  try {
    //לבדוק שאין שם משני כזה
    const queryString1 = `select * catering.menueventtype  WHERE Name=${newName};`;
    const row1 = await promiseQuery(queryString1);
    if (row1 == 0) {
      //להתריע לו ולהגיד לו או שישנה לשם אחר או שישנה תפריט אחר לשם אחר
      res.send(
        "קיים שם כזה של תפריט (בחר שם אח ר או שנה שלתפריט אחר כדי לשתוכל לקרוא לו בשם זה)"
      );
    } else {
      const queryString2 = `UPDATE catering.menueventtype SET Name ="${newName}" WHERE Id=${id};`;
      row2 = await promiseQuery(queryString2);
      res.send("שפ התפריט לסוג אירוע עודכן עודכן בהצלחה");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//9
//עדכון של כל השינווים שהתבצעו
routerMenuEventType.put("/updateAll/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const queryString = `UPDATE catering.menueventtype SET Price ="${newPrice}",MinimumPeople ="${newMinimumPeople}" WHERE Id=${id};`;
    row = await promiseQuery(queryString);
    res.send("המחיר עודכן בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//כאשר אני מוחקת אירוע מסוים לדוגמא בר מצווה
//אני ארצה שכל התפריטים לסוג האירוע בר מצווה יהיו לא פעילים
routerMenuEventType.put("/updateActiveAllMenuType/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryString = `UPDATE catering.menueventtype SET Active =False WHERE EventId=${id}`;
    const row = await promiseQuery(queryString);
    //לבדוק שכולם הפכו ללא פעילים
    res.send("סוגי התפריטים לאירוע זה נמחקו בהצלחה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//ייצוא הראוטר
module.exports = { routerMenuEventType };
