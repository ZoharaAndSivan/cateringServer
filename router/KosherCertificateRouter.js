//טבלת כשרות

// מודול שמאפשר צירת אובייקט חכם -שרת
const express = require("express");

//יצירת מופע של מחלקת ראוטר
const routerKosherCertificate = express.Router();

const mysql = require("mysql2");

//מאפשר לעשות שאילתה לדאטה בייס
const { promiseQuery } = require("../sql");

//הוספת תעודת כשרות כדי להתריע לו לפני פג תוקף











//ייצוא הראוטר
module.exports = { routerKosherCertificate };