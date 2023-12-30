const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const bodyparse = require('body-parser');
const location = path.join(__dirname, './public');

dotenv.config({
    path:'./.env'
})

app.use(express.static(location));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(bodyparse.json());

const db = mysql.createConnection({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT
})
db.connect((err) => { 
    if (err) throw err; 
    console.log("SQL connect");

    // db.query('select * from customer', (err, result) => { 
    //     if (err) throw err;
    //     console.log(result);
    // })
    
})
app.get('/demo', (req, res) => {
    res.render('demo.hbs');
 
})

app.post('/loginform', (req, res) => { 
    // res.render('login.hbs');
    console.log("render sucess");
    db.query("select * from emp;", (err, result) => {
        if (err) throw err;
        console.log("Login page get data");
        let  email = req.body.empemail;
        let password = req.body.emppass;

        // console.log(result[0].empemail);
        for (var i = 0; i < result.length; i++) { 
            // console.log(result[i].empemail);
            if (result[i].empemail == email && result[i].emppass == password){
                console.log("email and password is correct");
                res.render('demo.hbs', {
                    Employeename: result[i].empname,
                    EmployeeImg: result[i].empimg

                });
                console.log(result[i].empimg);
            }
            else { 
                alert("not found");
                if (i == result.length - 1)
                
                console.log("not found");
            }
        }

    })
})

app.get('/login', (req, res) => {
    res.render('login.hbs');
})



app.get('/', (req, res) => { 
    db.query('select * from Stu', (err, resu) => { 
        if (err) {
            console.log(err);
        }
        else {
            // console.log(resu);
            return res.render('index',{msg:resu[0]});
        }
        
        
    })  
})

app.post('/form', (req, res) => { 
    console.log("Form create");

    db.query("insert into emp set ?", {
        empname: req.body.empname,
        empage: req.body.empage,
        empemail: req.body.empemail,
        emppass: req.body.emppass,
        empimg: req.body.empimg
        
    }, (err, result) => { 
        if (err) throw err;
        res.render('login.hbs');
    })
   
})
app.set('view engine', 'hbs');

app.get('/database', (req, res) => { 
    db.query('select * from Stu', (err, result) => {
        // console.log(result);
        res.send(result);
    })
})





app.post('/angular', (req, res) => {   //angular api
    console.log(req.body);
    db.query("insert into demo set ?", { demoname: req.body.name, demoage: req.body.age }, (err, result) => {
        if (err) throw err;

        console.log("angular connect");
    })
})

app.get('/', (req, res) => { 
    
    return res.render('index'); 
    
})
app.listen(5000, (err, res) => {
    
    console.log("Website hosting");
})




// login start






// login end
