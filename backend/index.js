const express = require("express");
const app = express();
const router = express.Router();
const signInUp = require("./controller/signInUpRoute");
const cors = require("cors");

app.set("view engine", "ejs")
app.use('/controller', express.static('public/controller'));
app.use(cors());
app.use(express.json());

app.use("/routes", router);
app.use("/signinup", signInUp);

app.listen(4000, () => {
    console.log("Server started at port 4000");
})
