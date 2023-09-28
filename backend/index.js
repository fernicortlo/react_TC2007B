const express=require('express')
const MongoClient=require('mongodb').MongoClient
var cors=require('cors')
bodyParser=require('body-parser')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

let db;
const app=express();
app.use(cors());
app.use(bodyParser.json());


async function connectDB(){
    let client=new MongoClient("mongodb://localhost:27017/ticketSystem")
    await client.connect();
    db=client.db();
    console.log("conectado a la base de datos")
}

//getList, getMany, getManyReference
app.get("/tickets", async (request, response)=>{
    
    if ("_sort" in request.query){
        let sortBy=request.query._sort;
        let sortOrder=request.query._order=="ASC"?1:-1;
        let start=Number(request.query._start);
        let end=Number(request.query._end);
        let sorter={}
        sorter[sortBy]=sortOrder
        let data=await db.collection('Tickets').find({}).sort(sorter).project({_id:0}).toArray();
        response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        response.set('X-Total-Count', data.length)
        data=data.slice(start, end)
        console.log(data)
        response.json(data)
    }
})

//getOne
app.get("/tickets/:id", async (request, response)=>{
    let data=await db.collection('Tickets').find({"id": Number(request.params.id)}).project({_id:0}).toArray();
    response.json(data[0]);
})

app.listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337")
})