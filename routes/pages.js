const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('registration');
});
router.get('/login.html',(req,res)=>{
    res.render('login');
});

module.exports = router;
