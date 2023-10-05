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
async function log(sujeto, accion, objeto){
    toLog={}
    toLog["timestamp"]=new Date();
    toLog["sujeto"]=sujeto;
    toLog["accion"]=accion;
    toLog["objeto"]=objeto;
    await db.collection("log").insertOne(toLog);
}


//getList, getMany, getManyReference
app.get("/Tickets", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"correo": verifiedToken.correo});
        
        let parametersFind={}
        if(authData.rol=="Supervisor de Aula"){
            parametersFind["aula"]=authData.aula.nombreAula;
        
    }
    // determinar donde esta el endpoint
    if ("_sort" in request.query){ // list
        let sortBy=request.query._sort; 
        let sortOrder=request.query._order=="ASC"?1:-1; // si es asendente, 1, si no, -1 (descendente)
        let start=Number(request.query._start); 
        let end=Number(request.query._end);
        let sorter={} // dado que no puedo utilizar una variable como nombre o llave, se agreaga así
        sorter[sortBy]=sortOrder // se agrega la llave y el valor: asc: 1, desc: -1
        let data=await db.collection('Tickets').find(parametersFind).sort(sorter).project({_id:0}).toArray(); 
        response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        response.set('X-Total-Count', data.length)
        data=data.slice(start, end)
        console.log(data)
        response.json(data)
    }else if ("id" in request.query){ // getMany
        let data=[]
        for (let index=0; index<request.query.id.length; index++){
            let dataObtain=await db.collection('Tickets').find({id: Number(request.query.id[index])}).project({_id:0}).toArray();
            data=await data.concat(dataObtain)
        }
        response.json(data);
    }else { // getReference
        let data=[]
        data=await db.collection('Tickets').find(request.query).project({_id:0}).toArray();
        response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        response.set('X-Total-Count', data.length)
        response.json(data)
    }   
    }catch{
        response.sendStatus(401);
    }
})

//getOne
app.get("/Tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"correo": verifiedToken.correo})
        let parametersFind={"id": Number(request.params.id)}
        if(authData.rol=="Supervisor de Aula"){
            parametersFind["aula"]=authData.aula.nombreAula;
        }
        let data=await db.collection('Tickets').find(parametersFind).project({_id:0}).toArray();
        log(verifiedToken.correo, "ver objeto", request.params.id)
        response.json(data[0]);
    }catch{
        response.sendStatus(401);
    }
})

//create
app.post("/Tickets", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValue=request.body
        let data=await db.collection('Tickets').find({}).toArray();
        let id=data.length+1;
        addValue["id"]=id;
        let fechaCreacion=new Date();
        addValue["fechaCreacion"]=fechaCreacion;
        data=await db.collection('Tickets').insertOne(addValue);
        response.json(data);
    }catch{
        response.sendStatus(401);
    }
}) 
//     let addValue=request.body
//     let data=await db.collection('Tickets').find({}).toArray();
//     let id=data.length+1;
//     addValue["id"]=id;
//     let fechaCreacion=new Date();
//     addValue["fechaCreacion"]=fechaCreacion;

//     data=await db.collection('Tickets').insertOne(addValue);
//     response.json(data);
// })

app.post("/registrarse", async(request, response)=>{
    let correo=request.body.correo;
    let pass=request.body.pass;
    let fname=request.body.nombreCompleto;
    let rol=request.body.rol;
    let nombreAula=request.body.aula.nombreAula;
    let lugarAula=request.body.aula.lugarAula;
    let sponsorAula=request.body.aula.sponsorAula;
    console.log(request.body)
    let data= await db.collection("Usuarios").findOne({"Usuario": correo});
    if(data==null){
        try{
            bcrypt.genSalt(10, (error, salt)=>{
                bcrypt.hash(pass, salt, async(error, hash)=>{
                    let usuarioAgregar={"correo": correo, "pass": hash, "nombreCompleto": fname, "rol": rol, "aula": {"nombreAula": nombreAula, "lugarAula": lugarAula, "sponsorAula": sponsorAula}};
                    data= await db.collection("Usuarios").insertOne(usuarioAgregar);
                    response.sendStatus(201);
                })
            })
        }catch{
            response.sendStatus(401);
        }
    }else{
        response.sendStatus(401)
    }
})


app.post("/login", async(request, response)=>{
    let correo=request.body.correo;
    let pass=request.body.pass;
    let data= await db.collection("Usuarios").findOne({"correo": correo});
    if(data==null){
        response.sendStatus(401);
    }else{
        bcrypt.compare(pass, data.pass, (error, result)=>{
            if(result){
                let token=jwt.sign({correo: data.correo}, "secretKey", {expiresIn: 600});
                console.log(data)
                log(correo, "login", "");
                response.json({
                    "token": token,
                     "id": data.correo,
                    "nombreCompleto": data.nombreCompleto,
                    "rol": data.rol,
                    "aula": data.aula.nombreAula
                    })
            }else{
                response.sendStatus(401)
            }
        })
    }
})

app.listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337")
})