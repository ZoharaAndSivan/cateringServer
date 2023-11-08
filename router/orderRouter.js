//הזמנות
// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerOrder = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");


//1
//הוספת הזמנה
routerOrder.post("/addOrder",async(req,res)=>{
    const details = req.body;
    try{
        const queryString = `INSERT INTO catering.orders VALUES(0,"${UserId}","${MenuId}","${details.OrderDate}",
        "${details.EventDate}","${details.EventPlace}","${details.EventTime}","${details.ArrivalTime},True"
        "${details.FullPrice}","${details.Note}",False);`;
        const row = await promiseQuery(queryString);
        res.send("ההזמנה נשלחה לכניסה להזמנה לשינויים יכנס באמצעות הסיסמא שנשלחה לך")
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
})

//2
//ההצגת כל ההזמנות שמאושרות 
routerOrder.get("/getAllOrder",async (req,res)=>{
    try{
        const queryString=`select * from catering.orders where Approval=True and IsClose=True`
        const row=await promiseQuery(queryString)
        res.send(row);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

// routerOrder.get("/getAllOrders",async (req,res)=>{
//     try{
//         const queryString=`select * from catering.orders `
//         const row=await promiseQuery(queryString)
//         res.send(row);
//     }
//     catch(err){
//         console.log(err);
//         res.send(err);
//     }
// })

//3
//הצגת כל ההזמנות שמחכות לאישור
routerOrder.get("/getAllOrder",async (req,res)=>{
    try{
        const queryString=`select * from catering.orders where Approval=False`
        const row=await promiseQuery(queryString)
        res.send(row);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//4
//אישור הזמנה
routerOrder.put("/UpdateApproval/:id", async (req, res) => {
    const id = req.params.id;
    try{
    const queryString = `UPDATE catering.orders SET Approval=True WHERE Id=${id}`;
    const row = await promiseQuery(queryString);
    res.send("ההזמנה אושרה");
    }
    catch(err){
     console.log(err);
     res.send(err);
    }
  });


//5
//הצגת כל ההזמנות שעדיין התאריך לא עבר
routerOrder.get("/getOrderThatDateNotMoved",async (req,res)=>{
    //שמירת התאריך הנוכחי
    const date=new Date();
    try{
        const queryString=`select * from catering.orders where EventDate>="${date}" and IsClose=False`
        const row=await promiseQuery(queryString)
        res.send(row);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//6
//הצגת כל ההזמנות של היום הנוכחי
routerOrder.get("/getOrderThatDateToday",async (req,res)=>{
    //שמירת התאריך הנוכחי
    const date=new Date();
    try{
        const queryString=`select * from catering.orders where EventDate="${date}" and IsClose=False`
        const row=await promiseQuery(queryString)
        res.send(row);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//7
//הצגת כל ההזמנות של יום למחרת
routerOrder.get("/getOrderThatDateTomorrow",async (req,res)=>{
    //שמירת התאריך הנוכחי
    const date=new Date();
    //שמירת התאריך של יום למחרת התאריך הנוכחי
    const tomorrow=null;
    try{
        const queryString=`select * from catering.orders where EventDate="${tomorrow}" and IsClose=False`
        const row=await promiseQuery(queryString)
        res.send(row);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})


//8
//הצגת כל ההזמנות של תאריך מסויים
routerOrder.get("/getOrderThatDateTomorrow/:date",async (req,res)=>{
    const date=req.params.date; 
    try{
        const queryString=`select * from catering.orders where EventDate="${date}" and IsClose=False`
        const row=await promiseQuery(queryString)
        res.send(row);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})


//9
//הצגת הזמנות של לקוח מסוים
routerOrder.get("/getOrderThatDateTomorrow/:userId",async (req,res)=>{
    const id=req.params.userId; 
    try{
        const queryString=`select * from catering.orders where UserId="${id}" and IsClose=False`
        const row=await promiseQuery(queryString)
        res.send(row);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}) 


//ייצוא הראוטר
module.exports = { routerOrder };