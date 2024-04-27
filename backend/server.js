const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./.env'});

const app = require(`${__dirname}/app.js`);

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false
}).then(()=>{
    console.log("DB connection successful");
}).catch((err)=>{
    console.log("Ye kya ");
    console.log(err);
})

const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log(`Server connected with port: ${port}`);
})