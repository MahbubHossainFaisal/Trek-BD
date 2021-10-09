const app = require('./app.js')
//server
const port = 5000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`)
})