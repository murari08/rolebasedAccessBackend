const db = require('../database/db')


exports.addPost = (req,res) => {
    try{
        const {title,post} = req.body;
        console.log({title,post})
        db.query('insert into post (title,post) values (?,?)', [title,post], (err,results)=>{
            if(err){
              return  res.status(500).json({message:err.message})
            }

            res.status(200).json({message: 'added successfully'})
        })

    }catch(err){
        res.status(500).json({message:err.message})
        console.log(err)
    }
}

exports.addLog = (req,res)=> {
    try{
        const {email,role,activity}= req.body
        db.query('insert into logs (email,role,activity) values (?,?,?)' ,[email,role,activity], (err,results)=>{
            if(err){
                return res.status(500).json({message:err.message})
            }

            res.status(200).json({message: 'added successfully', ok:true})
        })
    }catch(err){
         res.status(500).json({message:err.message})
    }
}

exports.getLogs = (req,res)=>{
    try{

        db.query('select * from logs', (err,results)=>{
            if(err){
                return res.status(500).json({message:err.message})
            }

            res.status(200).json(results)
        })

    }catch(err){
         res.status(500).json({message:err.message})
    }
}

exports.getPost = (req,res)=>{
    try{

        db.query('select * from post', (err,results)=>{
            if(err){
                return res.status(500).json({message:err.message})
            }

            res.status(200).json(results)
        })

    }catch(err){
         res.status(500).json({message:err.message})
    }
}

exports.loginDetails = (req,res)=>{
    try{

        db.query('select * from login', (err,results)=>{
            if(err){
                return res.status(500).json({message:err.message})
            }

            res.status(200).json(results)
        })

    }catch(err){
         res.status(500).json({message:err.message})
    }
}

