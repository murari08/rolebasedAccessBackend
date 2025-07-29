const { JsonWebTokenError } = require('jsonwebtoken');
const db = require('../database/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret_key = 'krishna123'


exports.signup =async (req,res) =>{
    try{
        console.log('signup')
        console.log(req.body)
        const {email,password,role} = req.body;
        console.log({email,password,role})
        const newPass = await bcrypt.hash(password,10)
        console.log({newPass})
        db.query('insert into login (email,password,role) values (?,?,?)' , [email,newPass,role], (err,results)=>{
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
        db.query("SELECT * FROM login WHERE email = ?",[email], async(err,results)=>{
            if(err){
                return res.status(500).json({message:err.message})
            }
            console.log({results})
             if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });
            if(results){
                const isMatched = bcrypt.compare(password,results[0].password)
                if(isMatched){
                    const token = jwt.sign({email:email, role: results[0].role},secret_key,{expiresIn:'1d'})
                    res.status(200).json({email:email,token:token})
                }else{
                    res.status(401).send('Invalid password');
                }
                 

                 
            }else{
                 res.status(200).json({message:'user not found'})
            }

           

           
        })
    }catch(err){
        res.status(500).json({message:err.message})
        console.log(err)
    }
}
