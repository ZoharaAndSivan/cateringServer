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
routerOrder.post("/addOrder", async (req, res) => {
  const { user, order, menu } = req.body;
  try {
    // הוספת משתמש במידה וצריך
    const queryString1 = `select * from catering.users where Phone="${user.Phone}" and  Email="${user.Email}" `;
    const isRegister = await promiseQuery(queryString1);
    let userId = isRegister.length > 0 ? isRegister[0].Id : null;

    if (isRegister.length == 0) {
      const randomPassword = Math.floor(Math.random() * 100001);
      const queryString2 = `INSERT INTO catering.users VALUES(0,"${user.FirstName}","${user.LastName}","${user.Phone}", "${user.Adress}","${user.Email}","${randomPassword}",3,True);`;
      const addUser = await promiseQuery(queryString2);
      console.log(addUser);
      userId = addUser.insertId;
    }

    // הוספת הזמנה
    const formattedOrderDate = new Date(order.OrderDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedEventDate = new Date(order.EventDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const queryString3 = `INSERT INTO catering.orders VALUES(0,"${userId}","${order.MenuId}","${formattedOrderDate}",
        "${formattedEventDate}","${order.EventPlace}","${order.EventTime}","",
        ${order.FullPrice},"${order.Note}",False,${order.NumberPeople}, True);`;
    const addOrder = await promiseQuery(queryString3);

    // הוספת מוצרים להזמנה
    for (let i = 0; i < menu.length; i++) {
      const queryString4 = `INSERT INTO catering.foodsOrders  VALUES (0,${addOrder.insertId},${menu[i].Id},null,null);`;
      const row = await promiseQuery(queryString4);
    }
    res.send(
      "ההזמנה נשלחה לכניסה להזמנה לשינויים יכנס באמצעות הסיסמא שנשלחה לך"
    );
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//2
//ההצגת כל ההזמנות שמאושרות
routerOrder.get("/getAllOrder", async (req, res) => {
  try {
    const queryString = `select * from catering.orders where Approval=True and IsClose=True`;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//ההצגת כל ההזמנות של משתמש ספיציפי
routerOrder.get("/getAllOrdersByUserId/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const queryString = `select * from catering.orders where UserId=${id} and Status=True`;
    const row = await promiseQuery(queryString);

    for (let i = 0; i < row.length; i++) {
      const element = row[i];
      const queryString2 = `select * from catering.menueventtype where Id=${element.MenuId}`;
      const menu = await promiseQuery(queryString2);
      const queryString3 = `select * from catering.eventtype where Id=${menu[0].EventId}`;
      const event = await promiseQuery(queryString3);
      row[i].Menu = menu[0];
      row[i].Event = event[0];
    }
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

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
routerOrder.get("/getAllOrder", async (req, res) => {
  try {
    const queryString = `select * from catering.orders where Approval=False`;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//4
//אישור הזמנה
routerOrder.put("/UpdateApproval/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryString = `UPDATE catering.orders SET Approval=True WHERE Id=${id}`;
    const row = await promiseQuery(queryString);
    res.send("ההזמנה אושרה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//מחיקת הזמנה
routerOrder.put("/deleteOrder/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryString = `UPDATE catering.orders SET Status=False WHERE Id=${id}`;
    const row = await promiseQuery(queryString);
    res.send("ההזמנה נמחקה");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//5
//הצגת כל ההזמנות שעדיין התאריך לא עבר
routerOrder.get("/getOrderThatDateNotMoved", async (req, res) => {
  //שמירת התאריך הנוכחי
  const date = new Date();
  try {
    const queryString = `select * from catering.orders where EventDate>="${date}" and IsClose=False`;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//6
//הצגת כל ההזמנות של היום הנוכחי
routerOrder.get("/getOrderThatDateToday", async (req, res) => {
  //שמירת התאריך הנוכחי
  const date = new Date();
  try {
    const queryString = `select * from catering.orders where EventDate="${date}" and IsClose=False`;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//7
//הצגת כל ההזמנות של יום למחרת
routerOrder.get("/getOrderThatDateTomorrow", async (req, res) => {
  //שמירת התאריך הנוכחי
  const date = new Date();
  //שמירת התאריך של יום למחרת התאריך הנוכחי
  const tomorrow = null;
  try {
    const queryString = `select * from catering.orders where EventDate="${tomorrow}" and IsClose=False`;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//8
//הצגת כל ההזמנות של תאריך מסויים
routerOrder.get("/getOrderThatDateTomorrow/:date", async (req, res) => {
  const date = req.params.date;
  try {
    const queryString = `select * from catering.orders where EventDate="${date}" and IsClose=False`;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//9
//הצגת הזמנות של לקוח מסוים
routerOrder.get("/getOrderThatDateTomorrow/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const queryString = `select * from catering.orders where UserId="${id}" and IsClose=False`;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

const sendEmail = () => {
    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "delishes42@gmail.com",
        pass: "delishes1234",
      },
    });

    var mailOptions = {
      from: "delishes42@gmail.com",
      to: "delishes42@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };
  sendEmail();
//ייצוא הראוטר
module.exports = { routerOrder };
