const express=require('express')
const MongoClient=require('mongodb').MongoClient
var cors=require('cors')
bodyParser=require('body-parser')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const uri = "mongodb+srv://Fer:1234@pruebas.1e0thqh.mongodb.net/pruebas";
let db;
 
const app=express();
app.use(cors());
app.use(bodyParser.json());
const client = new MongoClient(uri);


async function connectDB(){
    try {
        await client.connect();
        db = client.db();
        console.log("Connected to the database");
    } catch(err) {
        console.error("Failed to connect to the database", err);
    }
}


//getList, getMany, getManyReference
app.get("/Tickets", async (request, response)=>{
    // determinar donde esta el endpoint
    if ("_sort" in request.query){ // list
        let sortBy=request.query._sort; 
        let sortOrder=request.query._order=="ASC"?1:-1; // si es asendente, 1, si no, -1 (descendente)
        let start=Number(request.query._start); 
        let end=Number(request.query._end);
        let sorter={} // dado que no puedo utilizar una variable como nombre o llave, se agreaga así
        sorter[sortBy]=sortOrder // se agrega la llave y el valor: asc: 1, desc: -1
        let data=await db.collection('Tickets').find({}).sort(sorter).project({_id:0}).toArray(); 
        response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        response.set('X-Total-Count', data.length)
        data=data.slice(start, end)
        console.log(data)
        response.json(data)
    }
    else {
        let data = await db.collection('Tickets').find({}).project({_id:0}).toArray();
        response.json(data);
    }
    
})

//getOne
app.get("/Tickets/:id", async (request, response)=>{
    let data=await db.collection('Tickets').find({"id": Number(request.params.id)}).project({_id:0}).toArray();
    response.json(data[0]);
})

app.listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337")
})