const express = require('express')


const app = express()

//get method
app.get('/', (req,res)=>{
    res.status(200).json({name:'Mahbub Hossain Faisal',father:'Monwar Hossain',mother:'Fatema Begum'})
})

//post methid
app.post('/',(req,res)=>{
    res.send('You can post here!')
})

const port = 5000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`)
})