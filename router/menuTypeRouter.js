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

//3
//עדכון כמות שאפשר לבחור מסוג מסוים
routerMenuType.put("/updateAmount/:id",async(req,res)=>{
const id=req.params.id
const newAmount=req.body;
try{
    const queryString = `UPDATE catering.menutype SET Amount =${newAmount.Amount} WHERE Id=${id} `
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
routerMenuType.put("/updateExtraPrice/:id",async(req,res)=>{
    const id=req.params.id
    const newExtraPrice=req.body;
    try{
        const queryString = `UPDATE catering.menutype SET ExtraPrice =${newExtraPrice.ExtraPrice} WHERE WHERE Id=${id}`
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
routerMenuType.put("/updateExtraType/:id",async(req,res)=>{
    const newExtraType=req.body;
    const id=req.params.id
    try{
        const queryString = `UPDATE catering.menutype SET ExtraType =${newExtraType.ExtraType} WHERE WHERE Id=${id} `
        const row=await promiseQuery(queryString)
        res.send(" מחיר של כל סוג נוסף עודכן בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })



//עדכונים של הכלללללל



//6
//כאשר אנימוחקת אירוע הוא צריך להגיע לכאן ולהפוך את כל סוגי התפריטים 
//שמתאימים לסוג שנבחר
routerMenuType.put("/updateActiveEvent/:idEventType",async(req,res)=>{
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
routerMenuType.put("/updateActiveRow/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const queryString = `UPDATE catering.menutype SET Active =False WHERE Id=${id}`
        const row=await promiseQuery(queryString)
        res.send("סוג המאכל בתפריט נמחק בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })

//8
//הוספת שורה שלימה של סוג מאכל
routerMenuType.post("/addTypeOfMenu/:MenuId", async (req, res) => {
    const id=req.params.MenuId
    const rowType=req.body;
    try{
    //    //לבדוק אם סוג המאכל קיים בטבלת סוגי מאכלים
    //    const queryString=`SELECT * FROM catering.foodstype where Name=${rowType.FoodTypeId}`;
    //    const row=await promiseQuery(queryString)
    //    if(row==0)
    //    {
    //     res.send("סוג המאכל לא קיים האם תרצה להוסיף אותו")
    //     //אם כן ילך לטבלת סוגי מאכלים ויוסיף
    //    }
    //    else{
      const queryString=`INSERT INTO catering.menutype  VALUES (0,${id},${rowType.FoodTypeId},"${rowType.Amount}","${rowType.ExtraPrice}","${rowType.ExtraType}",True);`
      const row=await promiseQuery(queryString)
      res.send(" הוסף בהצלחה")
    //    }      
   
    }
    catch(err)
    {
      console.log(err)
      res.send(err)
    }
  })


  
//9
//כאשר אנימוחקת סוג מאכל הוא צריך להגיע לכאן ולהפוך את כל השורות שנמצא בהם סוג המאכל שנמחק 
routerMenuType.put("/updateActiveFoodType/:idFoodType",async(req,res)=>{
    const id=req.params.idFoodType
    try{
        const queryString = `UPDATE catering.menutype SET Active =False WHERE FoodTypeId=${id}`
        const row=await promiseQuery(queryString)
        res.send("סוג המאכל מכל התפריטים נמחק בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })



//ייצוא הראוטר
module.exports = { routerMenuType };