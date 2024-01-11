//חוות דעת
// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerOpinion = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");

//1
//שליפה של כל חוות הדעת
routerOpinion.get("/getAllOpinion", async (req, res) => {
    const id = req.params.id;
    try {
      const queryString = `select * from catering.opinion `;
      const row = await promiseQuery(queryString);
      res.send(row);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });



//2
//הוספת חוות דעת
routerOpinion.post("/addOpinion/:userId", async (req, res) => {
    const userId=req.params.id
    const opinion = req.body;
    try {
      const queryString = `INSERT INTO catering.opinion  VALUES (0,"${userId}","${opinion.OpinionWrite}",False)`;
      const row = await promiseQuery(queryString);
      res.send("חוות הדעת  הוספה בהצלחה");
    } catch (err) {
      console.log(err); 
      res.send(err);
    }
  });


  //3
  //לעדכן חות דעת שהיא ראויה לעלות
  routerOpinion.put("/updateApproval/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const queryString = `UPDATE catering.menutype SET Approval =True WHERE Id=${id} `
        const row=await promiseQuery(queryString)
        res.send("חוות דעת שמשתמשים יכולים לצפות")
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
    })


//4
//שליפה של כל חוות הדעת שיכולים לצפות
routerOpinion.get("/getAllOpinionApproval", async (req, res) => {
  try {
    const queryString = `select * from catering.opinion where Approval =True `;
    const row = await promiseQuery(queryString);
    res.send(row);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});










//ייצוא הראוטר
module.exports = { routerOpinion };