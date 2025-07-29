const express = require('express')
const cors = require('cors')

const app = express();

const port = 5000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const useRouter = require('./routes/routes')
app.use('/api',useRouter)

app.listen(port,()=>{
    console.log('connected to port:',port) 
})
