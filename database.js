const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const pass = 'Theexpedition123.';

let db;

const mongoConnect = (cb)=>{
    MongoClient.connect(`mongodb+srv://chani:${pass}@entries-v7wrm.mongodb.net/test?retryWrites=true&w=majority`,
    {useNewUrlParser: true,
        useUnifiedTopology: true})
    .then(res =>{
        console.log('connected');
        db = res.db();
        cb();
    })
    .catch(err =>{
        console.log(err);
    });
    
};

const getDb = ()=>{
    if(db){
        return db;
    }
   else{throw 'No database found !'};
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;