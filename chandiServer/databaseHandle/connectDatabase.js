const mysql = require('mysql');
const conDetails = require('../config/database');
const tableSchema = require('./tableSchema');
const bcrypt = require('bcryptjs');

// create database connection
const con = mysql.createConnection(conDetails.conDetails);

// connect to database
module.exports.connet = function(){

        con.connect(function(err){
        if(err){
            throw err;
        } 
        else{
            console.log('connected');   
        }
    });
    
    for (let index = 0; index < tableSchema.tablesname.length; index++) {
       const tableName = tableSchema.tablesname[index];
            // check the availability of the tables
        con.query("CHECK TABLE "+tableName,function(err,result){
            if(err){
                throw err;
            }

            //DEBUG codes
            //console.log(tableName);
            //console.log(result[0].Msg_text);
            //console.log("Table 'webdata1.users' doesn't exist");
            //console.log("Table 'webdata1."+tableName+"'"+" doesn't exist");
            //Table 'webdata1.users' doesn't exist
            

            if(result[0].Msg_text == "Table '"+conDetails.conDetails.database+"."+tableName+"' doesn't exist"){
                // if =table not availble then create the tables
                createTables(tableSchema.tables[tableName].createTable);
            }
        });
    }
}

// function for create tables that not exits in database
function createTables(sql){
    con.query(sql,function(err,result){
        if(err){
            //throw err;
            console.log("tableExist");
        }
        else{
            console.log(result);
        }  
    });
}

// fuction for add users in to user table
module.exports.addNewUser = function InsertUser(user,callback){
    //console.log(user);
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(user[4],salt,function( err,hash){
            if(err){
                throw err;
            }
            user[4] = hash;
            con.query(tableSchema.tables.userData.insertIntoUserTable,[[user]],callback);
        })
    });
}

// new changes
module.exports.addRole = function(data ,callback){
 con.query(tableSchema.tables.role.adduser,[[data]],callback)
}

module.exports.addUsers = function(data , callback){
 con.query(tableSchema.tables.users.adduser,[[data]],callback)
}

module.exports.addMlt = function(data , callback){
    con.query(tableSchema.tables.mlt.adduser,[[data]],callback)
   }
   
 module.exports.addPatient = function(data , callback){
    con.query(tableSchema.tables.patient.adduser,[[data]],callback)
   }

   module.exports.addDoctor = function(data , callback){
    con.query(tableSchema.tables.doctor.adduser,[[data]],callback)
   }
   
   module.exports.addFrontdesk = function(data , callback){
    con.query(tableSchema.tables.frontdesk.adduser,[[data]],callback)
   }

   module.exports.addPatientbasichealthinfo = function(data , callback){
    con.query(tableSchema.tables.patientbasichealthinfo.adduser,[[data]],callback)
   }
   
   module.exports.addLabreport = function(data , callback){
    con.query(tableSchema.tables.labreport.adduser,[[data]],callback)
   }
   
   module.exports.addAppointment = function(data , callback){
    con.query(tableSchema.tables.appointment.adduser,[[data]],callback)
   }

   module.exports.addDiseasedetail = function(data , callback){
    con.query(tableSchema.tables.diseasedetail.adduser,[[data]],callback)
   }

   module.exports.addPrescription = function(data , callback){
    con.query(tableSchema.tables.prescription.adduser,[[data]],callback)
   }

   module.exports.addAppSchedule = function(data , callback){
    con.query(tableSchema.tables.appSchedule.adduser,[[data]],callback)
   }

   module.exports.addMedicine = function(data , callback){
    con.query(tableSchema.tables.medicine.adduser,[[data]],callback)
   }

   module.exports.addPayment= function(data , callback){
    con.query(tableSchema.tables.payment.adduser,[[data]],callback)
   }

   module.exports.addCurrentState= function(data , callback){
    con.query(tableSchema.tables.currentSate.adduser,[[data]],callback)
   }


   //get 
   module.exports.getUser= function(data,callback){
    var nic={NIC:data}
    console.log(nic);
    con.query(tableSchema.tables.users.getUser,nic,callback);  //get
   }





   