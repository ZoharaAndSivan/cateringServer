//סוג לתפריט
// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerMenuType = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");


//1
//שליפה של כל סוגי תפריטים
// routerMenuType.get("./getAllMenuType",async(req,res)=>{
//     try{
//        const queryString=`select * from catering.menutype where Active=True`
//        const rows=await promiseQuery(queryString);
//        res.send(rows);
//     }
//     catch(err){
//         console.log(err);
//         res.send(err);
//     }
// })




//2
//שליפה של כל הסוגים לתפריט מסוים
//לדוגמא את כל התפריט הבסיסי של בר מצווה
routerMenuType.get("/getAllTypeForMenu/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        
       const queryString=`SELECT * FROM catering.menutype where MenuId=${id};`
       const rows=await promiseQuery(queryString)
       res.send(rows)
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})



//עדכונים
//לבדוק תנאים-----------------------
//ולבדוק שזה באמת עודכן

//3
//עדכון כמות שאפשר לבחור מסוג מסוים
routerMenuType.put("/updateAmount",async(req,res)=>{
const newAmount=req.body;
try{
    const queryString = `UPDATE catering.menutype SET Amount =${newAmount.Amount} WHERE `
    const row=await promiseQuery(queryString)
    res.send("הכמות עודכנה בהצלחה")
}
catch(err){
    console.log(err);
    res.send(err);
}
})



//4
//עדכון תוספת מחיר שאפשר לבחור מסוג מסוים
routerMenuType.put("/updateExtraPrice",async(req,res)=>{
    const newExtraPrice=req.body;
    try{
        const queryString = `UPDATE catering.menutype SET ExtraPrice =${newExtraPrice.ExtraPrice} WHERE `
        const row=await promiseQuery(queryString)
        res.send("תוספת מחיר עודכן בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })


//5
//עדכון מחיר של כל סוג נוסף שאפשר לבחור מסוג מסוים
routerMenuType.put("/updateExtraType",async(req,res)=>{
    const newExtraType=req.body;
    try{
        const queryString = `UPDATE catering.menutype SET ExtraType =${newExtraType.EExtraType} WHERE `
        const row=await promiseQuery(queryString)
        res.send(" מחיר של כל סוג נוסף עודכן בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })


//6
//כאשר אנימוחקת אירוע הוא צריך להגיע לכאן ולהפוך את כל סוגי התפריטים 
//שמתאימים לסוג שנבחר
routerMenuType.put("/updateActive/:idEventType",async(req,res)=>{
    const id=req.params.idEventType
    try{
        const queryString = `UPDATE catering.menutype SET Active =False WHERE MenuId=${id}`
        const row=await promiseQuery(queryString)
        res.send("סוג התפריט נמחק בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })


//7
//להפוך שורה מסוימת ללא פעילה
//לדוגמא למחוק את מנה עיקית בתפריט מסוים שאני נמצאת בו
routerMenuType.put("/updateActive/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const queryString = `UPDATE catering.menutype SET Active =False WHERE`
        const row=await promiseQuery(queryString)
        //לבדוק שזה נמחק
        res.send("סוג המאכל בתפריט נמחק בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })

//8
//הוספת שורה שלימה של סוג מאכל
routerMenuType.post("/addTypeOfMenu", async (req, res) => {
    const rowType=req.body;
    try{
       //לבדוק אם סוג המאכל קיים בטבלת סוגי מאכלים
       const queryString=`SELECT * FROM catering.foodstype where Name=${FoodTypeId}`;
       const row=await promiseQuery(queryString)
       if(row==0)
       {
        res.send("סוג המאכל לא קיים האם תרצה להוסיף אותו")
       }
       else
       {
      //-----------לבדוק אם המאכל הזה כבר קיים-----------------
      const queryString=`INSERT INTO catering.menutype  VALUES (0,True);`
      const row=await promiseQuery(queryString)
      res.send(" הוסף בהצלחה")
       }      
   
    }
    catch(err)
    {
      console.log(err)
      res.send(err)
    }
  })

//9
  //כאשר אנימוחקת אירוע הוא צריך להגיע לכאן ולהפוך את כל סוגי התפריטים 
//שמתאימים לסוג שנבחר
routerMenuType.put("/updateActive/:idFoodType",async(req,res)=>{
    const id=req.params.idFoodType
    try{
        const queryString = `UPDATE catering.menutype SET Active =False WHERE FoodTypeId=${id}`
        const row=await promiseQuery(queryString)
        res.send("סוג התפריט נמחק בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })



//ייצוא הראוטר
module.exports = { routerMenuType };