const express = require("express");
const app = express();
const router = express.Router();
const signInUp = require("./controller/SignInUp");

app.set("view engine", "ejs")
app.use('/controller', express.static('public/controller'));

app.use("/routes", router);


router.get("/", (req, res) => {
    res.render('login', {
        utils: signInUp
    }); // Don't include the file extension or folder path
})

app.listen(4000, () => {
    console.log("Server started at port 4000");
})
