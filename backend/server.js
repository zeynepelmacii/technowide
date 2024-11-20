const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./Middleware/connect')
const routes = require('./Routes/routes')


app.use(express.json())
app.use('/api/v1/fb', routes)

const PORT = process.env.PORT || 8080

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI,()=>{
            console.log('Database Connected')
        })
        app.listen(PORT, ()=>{
            console.log('Server is listening on port '+ PORT + '...')
        })
    } catch (error) {
        console.log("Server/DB failed")
        console.error(error)
    }
}

start() 