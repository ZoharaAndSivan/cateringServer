//תפריטים לסוג אירוע

// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerMenuEventType = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");


//1
//שליפה של כל התפריטים לסוגי אירועי
// routerMenuEventType.get("/getAllMenuEventType",async(req,res)=>{
//     try{
//         const queryString=`SELECT * FROM catering.menueventtype where Active=True`
//         const rows=await promiseQuery(queryString)
//         res.send(rows)
//     }
//     catch(err)
//     {
//         console.log(err)
//         res.send(err)
//     }
// })


//2
//שליפת כל התפריט לאירוע מסויים
routerMenuEventType.get("/getAllMenuByEventTypeId/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const queryString=`SELECT * FROM catering.menueventtype where Active=True and EventId=${id}`
        rows=await promiseQuery(queryString)
        res.send(rows)
    }
    catch(err)
    {
        console.log(err)
        res.send(err)
    }
})


//3
//עדכון מחיר למנה
routerMenuEventType.put("/updatePrice/:id",async(req,res)=>{
    const id=req.params.id
    const newPrice=req.body.Price
    try{
        const queryString=`UPDATE catering.menueventtype SET Price ="${newPrice}" WHERE EventId=${id};`
        //לבדוק קודם שהוא עודכן
        res.send("המחיר עודכן בהצלחה")
    }
    catch(err)
    {
        console.log(err)
        res.send(err)
    }
})




//4
//עדכון מינימום אנשים
routerMenuEventType.put("/updateMinimumPeople/:id",async(req,res)=>{
    const id=req.params.id
    const newMinimumPeople=req.body.MinimumPeople
    try{
        const queryString=`UPDATE catering.menueventtype SET Price ="${newMinimumPeople}" WHERE EventId=${id};`
        //לבדוק קודם שהוא עודכן
        res.send("מספר מינימום האנשים עודכן עודכן בהצלחה")
    }
    catch(err)
    {
        console.log(err)
        res.send(err)
    }
})



//5
//מחיקת כל התפריטים מאירוע שלם שנמחק 
//לדוגמא אם מחקתי ברית אז הוא מוחק את כל התפריטם של ברית
routerMenuEventType.put("/updateActive/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const queryString = `UPDATE catering.menueventtype SET Active =False WHERE EventId=${id}`
        const row=await promiseQuery(queryString)
        res.send("סוג התפריט נמחק בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })



    //6
//מחיקת כל תפריט אחד  
//לדוגמט יש לי 3 תפריטם של בר מצווה אז אני מוחקת את אחד מהם לדוגמא את התפריט הבינוני
routerMenuEventType.put("/updateActive/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const queryString = `UPDATE catering.menueventtype SET Active =False WHERE Id=${id}`
        const row=await promiseQuery(queryString)
        res.send("סוג התפריט נמחק בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })

//7
//הוספת תפריט נוסף לסוג אירוע
routerMenuEventType.post("/updateActive/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body;
    try{
        const queryString = `INSERT INTO catering.menueventtype  VALUES (0,"${id}","${data.MinimumPeople}","${data.Price}","${data.Name}",True)`;
        const row = await promiseQuery(queryString);
    //לבדוק אם התפריט לסוג האירוע הוסף
    res.send("התפריט לסוג האירוע הוסף בהצלחה");
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })

    //4
//עדכון  שם התפריט המשני לסוג אירוע
routerMenuEventType.put("/updateName/:id",async(req,res)=>{
    const id=req.params.id
    const newName=req.body.Name
    try{
        //לבדוק שאין שם משני כזה 
        //להתריע לו ולהגיד לו או שישנה לשם אחר או שישנה תפריט אחר לשם אחר
        //-----------------------------
        const queryString=`UPDATE catering.menueventtype SET Name ="${newName}" WHERE EventId=${id};`
        //לבדוק קודם שהוא עודכן
        res.send("שפ התפריט לסוג אירוע עודכן עודכן בהצלחה")
    }
    catch(err)
    {
        console.log(err)
        res.send(err)
    }
})


//כאשר אני מוחקת אירוע מסוים לדוגמא בר מצווה
//אני ארצה שכל התפריטים לסוג האירוע בר מצווה יהיו לא פעילים
routerMenuEventType.put("/updateActiveAllMenuType/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const queryString = `UPDATE catering.menueventtype SET Active =False WHERE Id=${id}`
        const row=await promiseQuery(queryString)
        //לבדוק שכולם הפכו ללא פעילים
        res.send("סוגי התפריטים לאירוע זה נמחקו בהצלחה")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })









//ייצוא הראוטר
module.exports = { routerMenuEventType };