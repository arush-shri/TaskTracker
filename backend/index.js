const express = require("express");
const app = express();
const router = express.Router();
const signInUp = require("./controller/signInUpRoute");
const taskRoutes = require("./controller/TaskHandlerRoute");
const cors = require("cors");

app.set("view engine", "ejs")
app.use('/controller', express.static('public/controller'));
app.use(cors());
app.use(express.json());

app.use("/routes", router);
app.use("/signinup", signInUp);
app.use("/task", taskRoutes);

app.listen(4000, () => {
    console.log("Server started at port 4000");
})
