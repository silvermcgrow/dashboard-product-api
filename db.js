const mongoose = require('mongoose');
const dbHost = process.env.DBHOST;

mongoose.connect(dbHost)
        .then(()=>{
            console.log("MongoDB is Connected...")
        }).catch((err)=>{
            console.log('Error while connecting mongoDB',err);
        })