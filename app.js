//ייבוא מודולים

//מאפשר להעביר מלוקל הוסט אחד לשני
const cors = require("cors");
// מודול שמאפשר יצירת אובייקט חכם -שרת
const express = require("express");
//איך יומר המידע שיגיע
const bodyparser = require("body-parser");

//ייבוא ראוטרים

//ראוטר סוג אירוע
const { routerEventType } = require("./router/eventTypeRouter");
//ראוטר תפריטים לסוג אירוע
const{routerMenuEventType}=require("./router/menuEventTypeRouter")
//ראוטר סוגי מאכלים
const {routerFoodsType}=require("./router/foodsTypeRouter")
//ראוטר סוג לתפריט
const {routerMenuType}=require("./router/menuTypeRouter")
//ראוטר מאכלים
const { routerFood } = require("./router/foodRouter");
//ראוטר מוצר לתפריט
const { routerProductToMenu } = require("./router/productToMenuRouter");
//ראוטר משתמש
const { routerUser } = require("./router/userRouter");
//ראוטר יצירת קשר
const { routerContact } = require("./router/contactRouter");
//ראוטר  חוות דעת
const { routerOpinion } = require("./router/opinionRouter");
//ראוטר הזמנות
const { routerOrder } = require("./router/orderRouter");


//ייבוא אס קיו אל
const { mysqlConnection } = require("./sql");
//יצירת מופע של שרת אקספרס
const app = express();

app.use(cors());
app.use(bodyparser.json());

//שימוש בראוטר



app.use("/eventTypeRouter", routerEventType);
app.use("/menuEventTypeRouter", routerMenuEventType);
app.use("/foodsTypeRouter", routerFoodsType)
app.use("/menuTypeRouter",routerMenuType)
app.use("/foodRouter", routerFood);
app.use("/productToMenuRouter",routerProductToMenu)
app.use("/userRouter", routerUser);
app.use("/contactRouter",routerContact)
app.use("/opinionRouter",routerOpinion)
app.use("/orderRouter",routerOrder)
const port = 8080;

//העלעת השרת
app.listen(port, () => {
  console.log("running server");
});

// הפעל החיבור של האס קיו אל
mysqlConnection.connect((err) => {
  if (!err) console.log("successfuly");
  else console.log("errorfuly");
});

