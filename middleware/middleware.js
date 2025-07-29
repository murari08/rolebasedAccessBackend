const jwt = require('jsonwebtoken')
const secret_key = 'krishna123'

const verifyToken = (req,res,next)=>{
    try{
        console.log("hiiii")
        const header = req.headers['Authorization'];
        console.log({header})
        const token = header.split(' ')[1];
        if(token){
            try{
                const decode = jwt.verify(token,secret_key)
                req.user = decode
                next()
            }catch(err){
                res.status(400).json({message: 'token is not valid'})
            }
           
        }else{
            res.status(400).json({message:'access denied, no token'})
        }
        
    }catch(err){
        res.status(500).json({message: err.message})
        console.log(err)
    }
}

function verifyAuthToken (req, res, next){
    console.log("kkk")
    let token = req.headers['authorization']
    token = token.split(' ')[1]
    console.log({token})
    if(token){
         try{
                const decode = jwt.verify(token,secret_key)
                console.log({decode})
                req.user = decode
                next()
            }catch(err){
                res.status(400).json({message: 'token is not valid'})
            }
    }else{
        res.status(401).json({message:'please provide token'})
    }
    console.log('middleware called')
}

const roleBasedAccess = (...allowRoles) => {
    try{
         return (req,res,next) =>{
            console.log(allowRoles)
            console.log(req.user.role)
        if(!allowRoles.includes(req.user.role)){
            return res.status(403).json({message:"Access denied!"})
        }
        next();
    }

    }catch(err){
         return res.status(403).json({message: err.message})
    }
   
}

module.exports= {
    verifyToken,
    verifyAuthToken,
    roleBasedAccess
}
