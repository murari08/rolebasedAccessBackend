const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../database/db')
const jwt = require('jsonwebtoken')

const secret_key = 'krishna123'


exports.signup = (req,res) =>{
    try{
        console.log('signup')
        console.log(req.body)
        const {email,password,role} = req.body;
        console.log({email,password,role})
        db.query('insert into login (email,password,role) values (?,?,?)' , [email,password,role], (err,results)=>{
            if(err){
                return res.status(500).json({message:err.message})
            }
            const token = jwt.sign({email:email, role:role},secret_key, {expiresIn:'1d'})

            res.status(200).json({message: "Signup successful", token:token})
        })
    }catch(err){    
        res.status(500).json({message:err.message})
        console.log(err)
    }
}

exports.login = (req,res) => {
    try{
        const {email,password}  = req.body
        console.log({email,password})
        db.query("SELECT * FROM login WHERE email = ? AND password= ?",[email,password], async(err,results)=>{
            if(err){
                return res.status(500).json({message:err.message})
            }
            console.log({results})
             if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });
            if(results){
                 const token = jwt.sign({email:email, role: results[0].role},secret_key,{expiresIn:'1d'})

                 res.status(200).json({email:email,token:token})
            }else{
                 res.status(200).json({message:'user not found'})
            }

           

           
        })
    }catch(err){
        res.status(500).json({message:err.message})
        console.log(err)
    }
}
