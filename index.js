const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : 'localhost', 
    user : 'root',
    password : 'password',
    database : 'employeeSystem', 
    insecureAuth : true,
    multipleStatements: true
});
db.connect((err) => {

    if(!err)
        console.log('Database is connected!');
    else
        console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
    });
app.post('/create',(req,res) => {
    // console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    db.query("INSERT INTO employee(name,age,country,position,wage) VALUES(?,?,?,?,?)",
    [name,age,country,position,wage],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Value Insered!!");
        }
    }
    );

});

app.get('/employees',(req,res) => {
    db.query("SELECT * FROM employee",(err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
        "UPDATE  employee SET wage = ? WHERE id = ?",
    [wage, id], 
    (err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id=?", id , (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// router.get('/', (req, res) => {
//     try {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
//         res.status(201).send('ok')
//     } catch (error) {
//         console.error(error)
//     }
// })

app.post('/register',(req,res) => {
    // try {
    //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    //         res.status(201).send('ok')
    //     } catch (error) {
    //         console.error(error)
    //     }
    console.log(req.body);
    const username = req.body.username;
    const phonenumber = req.body.phonenumber;
    const emailaddress = req.body.emailaddress;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const dateofbirth = req.body.startDate;
    const gender = req.body.option;
    db.query("INSERT INTO users(username,phonenumber,emailaddress,password,confirmpassword,gender,dateofbirth) VALUES(?,?,?,?,?,?,?)",
    [username,phonenumber,emailaddress,password,confirmpassword,gender,dateofbirth],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Value User Insered!!");
        }
    }
    );
});

app.post('/login', (req, res)=> {
    console.log(req.body);
    const emailaddress = req.body.emailaddress;
    const password = req.body.password;
    db.query(
        "SELECT * FROM users WHERE emailaddress=? AND password =?",
        [emailaddress, password],
        (err, result) => {
            if(err){
                res.send({err: err});
            }else{
                if(result.length > 0){
                    res.send(result)
                }else{
                    res.send({message: "Wrong email/password combination!"})
                }
            }
        }

    );
    

});

app.get('/showData',(req,res) => {
    console.log('enter!!!!!!');
    db.query("SELECT * FROM users",(err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});
