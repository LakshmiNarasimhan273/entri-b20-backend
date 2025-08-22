const mongoose = require("mongoose");

const dbConnection = async () => {
    try{
        // Connection process for Compass
        // await mongoose.connect(process.env.DBURI) // mongodb://localhost:27017

        // Connection process for ATLAS
        await mongoose.connect(process.env.DBURI, { // mongodb Cloud PORT
            ssl: true, // ssl - Secured Sockets Layer
            tlsAllowInvalidCertificates: false // Branch security system for ssl
            // tls - Transport Layer Security
        });
        console.log("Database connection established");
    }catch(err){
        console.error(err);        
    }
}

module.exports = dbConnection;