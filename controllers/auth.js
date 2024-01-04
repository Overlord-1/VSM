const mysql = require("mysql");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config({ path: ".env" });
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: "3308",
});
db.query("USE `VSM-login`");

exports.register = (req, res) => {
  console.log(req.body);
  const { name, email, password, repassword } = req.body;

  db.query(
    "SELECT email FROM users WHERE email =?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("registration", {
          message: "Email already registered please login to continue",
        });
      } else if (password !== repassword) {
        return res.render("registration", {
          message: "Passwords do not match please recheck",
        });
      } else {
        // encrypt the password using bcryptjs
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        //THIS SECTION IS COMMENTED WHEN UI NEEDS TO BE UPDATED 

        db.query('INSERT INTO users SET ?',{
            name:name,
            email:email,
            password:hashedPassword
        },
        (error,results)=>{
            if(error)
            {
                console.log(error);
            }
            else{
                console.log(results);
                return res.render('index',{
                    message:name
                });               
            }
        });
        
                // return res.render('index',{
                //     message:name
                // });               
        
    }
    }
  );
  //   res.render("index.hbs");
};
