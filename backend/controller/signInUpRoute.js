const expres = require("express");
const { initiateSignin } = require("./SignInUp")
const signRoute = expres.Router();

signRoute.post("/login", (req, res) => {
    const result = initiateSignin(req.body.email, req.body.password)
    if(result === true){
        res.redirect('google.com')     //TO CHANGE LATER
    }
    else{
        res.send(result)
    }
})

signRoute.post("/signup", (req, res) => {
    const result = initiateSignin(req.body.email, req.body.password, req.body.name, req.body.phoneNumber, req.body.age)
    if(result === true){
        res.redirect('google.com')     //TO CHANGE LATER
    }
    else{
        res.send(result)            //TO CHANGE LATER
    }
})

module.exports = signRoute