const expres = require("express");
const { initiateSignin, initiateSignup } = require("./SignInUp")
const signRoute = expres.Router();
const jwt = require('jsonwebtoken');

signRoute.post("/login", (req, res) => {
    const result = initiateSignin(req.body.email, req.body.password)
    if(result === true){
        const token = jwt.sign({ userId: req.body.email }, { expiresIn: '4h' });
        res.json({ token });     //TO CHANGE LATER
    }
    else{
        res.send(result)
    }
})

signRoute.post("/signup", (req, res) => {
    const result = initiateSignup(req.body.email, req.body.password, req.body.name, req.body.phoneNumber, req.body.age)
    if(result === true){
        const token = jwt.sign({ userId: req.body.email }, { expiresIn: '4h' });
        res.json({ token });      //TO CHANGE LATER
    }
    else{
        res.send(result)            //TO CHANGE LATER
    }
})

module.exports = signRoute