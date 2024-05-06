import { getConnection } from "../database/connection.js";
const connections=getConnection();
connections.connect();

import bcrypt from 'bcrypt';
export const getAllUsers= (req,res)=>{
    var sql="SELECT * FROM signup";
    connections.query(sql,function(error,result){
        if(error){
            console.log("error connecting to db");
            res.status(500).send({status:false,message:'error connecting to db'})
    }else{
        res.send({status:true,data:result})
    }
    })
};

export const getParticularUser =  (req,res)=>{
    var userid=req.params.id;
    var sql="SELECT * FROM signup WHERE id="+userid;
    connections.query(sql,function(error,result){
        if(error){
            console.log("error connecting to db");
            res.status(500).send({status:false,message:"user fetch failed"})
        }
        else{
            if(result.length===0){
                res.status(404).send({message:'Id NOT AVAILABLE'});
            }
        else{
            res.send({status:true, data:result});
        }
    }
        });
    };
 
export const postUserData = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let mobileNumber = req.body.mobileNumber;
    let password = req.body.password;

    console.log('Received Data:', { name, email, mobileNumber, password });

   
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Internal Server Error');
        }

        let sql = `INSERT INTO signup (name, email, mobileNumber, password) VALUES (?, ?, ?, ?)`;
        if (!name || !email || !mobileNumber || !password) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        connections.query(sql, [name, email, mobileNumber, hash], (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).send('Internal Server Error');
            } else {
                res.send({ status: true, message: "User created successfully" });
            }
        });
    });
};
//    export const updateUser=(req,res)=>{
//         let sql="UPDATE signup SET name='" + req.body.name+  "', email='" +req.body.email+  " ' , mobileNumber='" +req.body.mobileNumber+  " ',password='" + req.body.password+  "' WHERE id="+req.params.id;
 
//         connections.query(sql,(error,result)=>{
//             if(error){
//                 res.status(500).send({status:false,message:"user update failed"});
 
//             } else{
//                 if(result.affectedRows===0){
//                     res.status(404).send({message:'Id NOT AVAILABLE'});
//                 }
//             else{
//                 res.send({status:true, message:"user update success"});
//             }
//         }
//         });
//     };

export const updateUser = (req, res) => {
    let email = req.body.email;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;

    if (!email || !newPassword || !confirmPassword) {
        return res.status(400).send({ message: "All fields are required" });
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).send({ message: "Passwords do not match" });
    }

    bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Internal Server Error');
        }

        let checkEmailSql = `SELECT * FROM signup WHERE email = ?`;
        connections.query(checkEmailSql, [email], (err, results) => {
            if (err) {
                console.error('Error checking email:', err);
                return res.status(500).send('Internal Server Error');
            }
            if (results.length === 0) {
                return res.status(404).send({ message: "Email not found" });
            }

            let updatePasswordSql = `UPDATE signup SET password = ? WHERE email = ?`;
            connections.query(updatePasswordSql, [hash, email], (err, results) => {
                if (err) {
                    console.error('Error updating password:', err);
                    return res.status(500).send('Internal Server Error');
                }
                res.send({ status: true, message: "Password updated successfully" });
            });
        });
    });
};

     export const deleteUser=(req,res)=>{
        let sql="DELETE FROM signup WHERE id="+req.params.id+"";
        connections.query(sql,(error,result)=>{
            if(error){
                res.status(500).send({status:false,message:"user delete failed"});
            }  else{
                if(result.affectedRows===0){
                    res.status(404).send({message:'Id NOT AVAILABLE'});
                }else{
                res.send({status:true,message:"user deleted successfully"})
            }
        }
        })
    };
    export const currentUser =async (req,res) =>{
        return res.json(req.user);
    }
    



    