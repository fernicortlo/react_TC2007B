const express=require('express')
const MongoClient=require('mongodb').MongoClient
var cors=require('cors')
bodyParser=require('body-parser')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const https=require("https")
const fs=require("fs")
//security applied
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

app.get("/Tickets", async (request, response) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });

        let parametersFind = {};
        if (authData.rol === "Supervisor de Aula") {
            parametersFind["aula"] = authData.aula.nombreAula;
        }

        if ("prioridad" in request.query) {
            // If "prioridad" is present in the query, filter by it
            console.log("Filtering by Prioridad:", request.query.prioridad)
            parametersFind["prioridad"] = request.query.prioridad;
        }
        if ("clasificacion" in request.query) {
            // If "prioridad" is present in the query, filter by it
            console.log("Filtering by Clasificacion:", request.query.clasificacion)
            parametersFind["clasificacion"] = request.query.clasificacion;
        }
        if ("tipo" in request.query) {
            // If "prioridad" is present in the query, filter by it
            console.log("Filtering by Tipo:", request.query.tipo)
            parametersFind["tipo"] = request.query.tipo;
        }
        if ("estatus" in request.query) {
            // If "prioridad" is present in the query, filter by it
            console.log("Filtering by Estatus:", request.query.estatus)
            parametersFind["estatus"] = request.query.estatus;
        }
        if ("aula" in request.query) {
            // If "prioridad" is present in the query, filter by it
            console.log("Filtering by Estatus:", request.query.aula)
            parametersFind["aula"] = request.query.aula;
        }
        if ("id" in request.query) {
            // If "id" is present in the query, filter by it
            console.log("Filtering by ID:", request.query.id);
            parametersFind["id"] = Number(request.query.id); // Convert it to a number
        }
        

        // Determine where the endpoint is
        if ("_sort" in request.query) { // list
            let sortBy = request.query._sort;
            let sortOrder = request.query._order === "ASC" ? 1 : -1;
            let start = Number(request.query._start);
            let end = Number(request.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;

            const total = await db.collection('Tickets').countDocuments(parametersFind);
            response.set('Access-Control-Expose-Headers', 'X-Total-Count');
            response.set('X-Total-Count', total);

            const data = await db.collection('Tickets')
                .find(parametersFind)
                .sort(sorter)
                .project({ _id: 0 })
                .skip(start)
                .limit(end - start)
                .toArray();

            response.json(data);
        } 
        else if ("id" in request.query) { // getMany
            let data = [];
            for (let index = 0; index < request.query.id.length; index++) {
                let dataObtain = await db.collection('Tickets').find({ id: Number(request.query.id[index]) }).project({ _id: 0 }).toArray();
                data = data.concat(dataObtain);
            }
            response.json(data);
        } 
        else { // getReference
            let data = await db.collection('Tickets').find(parametersFind).project({ _id: 0 }).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count');
            response.set('X-Total-Count', data.length);
            response.json(data);
        }
    } catch(error) {
        console.error(error);
        response.sendStatus(401);
    }
});


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
        // Format the date as "dd/mm/yyyy hh:mm"
        let formattedDate = fechaCreacion.toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        addValue["fechaCreacion"]=formattedDate;
        data=await db.collection('Tickets').insertOne(addValue);
        response.json(data);
    }catch{
        response.sendStatus(401);
    }
}) 

//update
app.put("/Tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValue=request.body
        addValue["id"]=Number(request.params.id);
        let data=await db.collection("Tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
        //data=await db.collection('Tickets').find({"id": Number(request.params.id)}).project({_id:0}).toArray();
        //response.json(data[0]);

         // Create a new Actualizaciones record
         let dataA=await db.collection('Actualizaciones').find({}).toArray();
         let idA=dataA.length+1;
         fechaActual = new Date();
         let formattedDateA = fechaActual.toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
         let actualizacionesRecord = {
            id: idA,
            updatedBy: verifiedToken.correo,
            updateTimestamp: formattedDateA,
            updateData: addValue, // You may want to structure this data as needed
        };
      await db.collection("Actualizaciones").insertOne(actualizacionesRecord);
    }catch{
        response.sendStatus(401);
    }
})  


// //create
// app.post("/Historial", async (request, response)=>{
//     try{
//         let token=request.get("Authentication");
//         let verifiedToken = await jwt.verify(token, "secretKey");
//         let addValue=request.body
//         let data=await db.collection('Tickets').find({}).toArray();
//         let id=data.length+1;
//         addValue["id"]=id;

        let fechaCreacion=new Date();
        // Format the date as "dd/mm/yyyy hh:mm"
        let formattedDate = fechaCreacion.toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        addValue["fechaCreacion"]=formattedDate;
        data=await db.collection('Tickets').insertOne(addValue);
        response.json(data);
    }catch{
        response.sendStatus(401);
    }
}) 

//GetHistorial
app.get("/Historial/:ticketId", async (request, response) => {
    try {
        const id = request.params.ticketId; // Use 'ticketId' here
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });
        let parametersFind = { "ticketId": Number(request.params.ticketId) }; // Use 'ticketId' here

        if (authData.rol == "Supervisor de Aula") {
            parametersFind["aula"] = authData.aula.nombreAula;
        }
        
        let data = await db.collection('Actualizaciones').find(parametersFind).project({ _id: 0 }).toArray();
        console.log(data);
        log(verifiedToken.correo, "ver objeto", request.params.ticketId);
        
        response.set('Access-Control-Expose-Headers', 'X-Total-Count');
        response.set('X-Total-Count', data.length);
        response.json(data);
    } catch (error) {
        console.error(error); // Log the error for debugging
        response.sendStatus(401);
    }
});


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

// https.createServer({
//     cert: fs.readFileSync("backend.cer"),
//     key: fs.readFileSync("backend.key"),
// }, app).listen(1337, ()=>{
//     connectDB();
//     console.log("Servidor escuchando en puerto 1337")
// })

app.listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337")
})