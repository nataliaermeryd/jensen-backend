const credentials = {secretUsername:"username" , secretPassword:"password"}
const cors = require("cors")
const express = require("express")
const app = express()

process.env.PORT = 3000

app.use(cors())
app.get("/", (req, res)=>{

    const encodedAuth = (req.headers.authorization || '')
    .split(' ')[1] || ''
    
    const [username, password] = Buffer.from(encodedAuth, 'base64')
        .toString().split(':')

        if(username===credentials.secretUsername && password===credentials.secretPassword){
            res.status(200).send({"STATUS":"SUCCESS"})
        }else{
            res.set('WWW-Authenticate', 'Basic realm="Acess to Index"')
            res.status(401).send("Unauthorised access")
        }
})



app.listen(3000 , ()=>{
    console.log(`STARTED LISTENING ON PORT ${process.env.PORT}`)
});