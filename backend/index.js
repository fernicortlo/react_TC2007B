const express=require('express')
const MongoClient=require('mongodb').MongoClient
var cors=require('cors')
bodyParser=require('body-parser')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const https=require("https")
const fs=require("fs")
const { Console } = require('console')
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

        if (authData.rol === "Administrador") {
          response.sendStatus(403); // Forbidden
          return;
        }


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
        
        parametersFind["estatus"] = { $ne: "Terminado" };
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
        if (authData.rol === "Administrador") {
          response.sendStatus(403); 
          return;
      }


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
        let authData=await db.collection("Usuarios").findOne({"correo": verifiedToken.correo})

        if (authData.rol === "Administrador") {
          response.sendStatus(403); 
          return;
      }


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


        //Insert Actualización
         // Create a new Actualizaciones record
         let dataA=await db.collection('Actualizaciones').find({}).toArray();
         let idA=dataA.length+1;
         console.log(idA)
         let idZ = 1

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
            updatedBy: authData.nombreCompleto,
            updateTimestamp: formattedDateA,
            updateData: addValue, 
            idact: idZ,
        };
      await db.collection("Actualizaciones").insertOne(actualizacionesRecord);

        
    }catch{
        response.sendStatus(401);
    }
}) 


//update
app.put("/Tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"correo": verifiedToken.correo})
        
        if (authData.rol === "Administrador") {
          response.sendStatus(403); 
          return;
      }

        let addValue=request.body
        addValue["id"]=Number(request.params.id);
        parametersFind={"id": Number(request.params.id)}
        let estatusfin=addValue.estatus;
        if(estatusfin==="Terminado"){
            let addValue=request.body
            fechaActual= new Date();
            let fechafin= fechaActual.toLocaleString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
            addValue["fechafin"]=fechafin;
        }
        let data=await db.collection("Tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
         // Create a new Actualizaciones record
         let dataA=await db.collection('Actualizaciones').find({}).toArray();
         let idA=dataA.length+1;
         let dataZ = await db.collection('Actualizaciones').find({ "updateData.id": Number(request.params.id) }).toArray();
         let idZ=dataZ.length+1;
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
            updatedBy: authData.nombreCompleto,
            updateTimestamp: formattedDateA,
            updateData: addValue, 
            idact: idZ,
        };
      await db.collection("Actualizaciones").insertOne(actualizacionesRecord);
      log(verifiedToken.correo, "actualizar objeto", request.params.id)
    }catch{
        response.sendStatus(401);
    }
})



//actualizaciones 
app.get("/Historial", async (request, response) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });

        if (authData.rol === "Administrador") {
          response.sendStatus(403); 
          return;
      }

        

        let parametersFind = {};
        if (authData.rol === "Supervisor de Aula") {
            parametersFind["updateData.aula"] = authData.aula.nombreAula;
        }
        // Determine where the endpoint is
        if ("_sort" in request.query) { // list
            let sortBy = request.query._sort;
            let sortOrder = request.query._order === "ASC" ? 1 : -1;
            let start = Number(request.query._start);
            let end = Number(request.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;

            if ("updateData.id" in request.query) {
                parametersFind["updateData.id"] = Number(request.query["updateData.id"]);
            }
            //parametersFind["estatus"] = { $ne: "Terminado" };

            const total = await db.collection('Actualizaciones').countDocuments(parametersFind);
            response.set('Access-Control-Expose-Headers', 'X-Total-Count');
            response.set('X-Total-Count', total);

            const data = await db.collection('Actualizaciones')
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
                let dataObtain = await db.collection('Actualizaciones').find({ id: Number(request.query.id[index]) }).project({ _id: 0 }).toArray();
                data = data.concat(dataObtain);
            }
            response.json(data);
        } 
        else { // getReference
            let filter = request.query.filter ? JSON.parse(request.query.filter) : {};

            console.log(filter);
            let data = await db.collection('Actualizaciones').find({parametersFind, ...filter }).project({ _id: 0 }).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count');
            response.set('X-Total-Count', data.length);
            response.json(data);
        }
    } catch(error) {
        console.error(error);
        response.sendStatus(401);
    }
});

app.get("/Finalizado", async (request, response) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });

        if (authData.rol === "Administrador") {
          response.sendStatus(403); 
          return;
      }


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
        
        parametersFind["estatus"] = "Terminado";
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
app.get("/Finalizado/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"correo": verifiedToken.correo})

        if (authData.rol === "Administrador") {
          response.sendStatus(403); 
          return;
      }

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

//GETUsuarios
app.get("/Usuarios", async (request, response) => {
  try {
      let token = request.get("Authentication");
      let verifiedToken = await jwt.verify(token, "secretKey");
      let authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });

      if (authData.rol !== "Administrador") {
        response.sendStatus(403); // Forbidden
        return;
      }

      // Determine where the endpoint is
      if ("_sort" in request.query) { // list
          let sortBy = request.query._sort;
          let sortOrder = request.query._order === "ASC" ? 1 : -1;
          let start = Number(request.query._start);
          let end = Number(request.query._end);
          let sorter = {};
          sorter[sortBy] = sortOrder;
          let parametersFind={};

          const total = await db.collection('Usuarios').countDocuments(parametersFind);
          response.set('Access-Control-Expose-Headers', 'X-Total-Count');
          response.set('X-Total-Count', total);

          const data = await db.collection('Usuarios')
              .find(parametersFind)
              .sort(sorter)
              .project({ _id: 0 })
              .skip(start)
              .limit(end - start)
              .toArray();

          response.json(data);
          // console.log(data)
      } 
      else if ("id" in request.query) { // getMany
          let data = [];
          for (let index = 0; index < request.query.id.length; index++) {
              let dataObtain = await db.collection('Usuarios').find({ id: Number(request.query.id[index]) }).project({ _id: 0 }).toArray();
              data = data.concat(dataObtain);
          }
          response.json(data);
      } 
      else { // getReference
          let data = await db.collection('Usuarios').find(parametersFind).project({ _id: 0 }).toArray();
          response.set('Access-Control-Expose-Headers', 'X-Total-Count');
          response.set('X-Total-Count', data.length);
          response.json(data);
      }
  } catch(error) {
      console.error(error);
      response.sendStatus(401);
  }
});

//DELETEUsuarios
//delete
app.delete("/Usuarios/:id", async (request, response)=>{
  try{
      let token=request.get("Authentication");
      let verifiedToken = await jwt.verify(token, "secretKey");
      let authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });

      if (authData.rol !== "Administrador") {
        response.sendStatus(403); // Forbidden
        return;
      }
      let data=await db.collection('Usuarios').deleteOne({"id": Number(request.params.id)});
      log(verifiedToken.correo, "borrar usuario", request.params.id)
      response.json(data);
  }catch{
      response.sendStatus(401);
  }
})



//GRAFICAS
//Cuenta tickets por aula
app.get('/barChart', async (request, response) => {
    try {
      const token = request.get("Authentication");
      const verifiedToken = await jwt.verify(token, "secretKey");
      const authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });

      if (authData.rol === "Administrador" || authData.rol === "Supervisor de Aula") {
        response.sendStatus(403); 
        return;
    }

  
      const currentDate = new Date();
      const oneWeekAgo = new Date(currentDate);
      oneWeekAgo.setDate(currentDate.getDate() - 7);
  
      const formattedOneWeekAgo = oneWeekAgo.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const formattedCurrentDate = currentDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const aggregationPipeline = [
        {
          $match: {
            $or: [
              {
                fechaCreacion: {
                  $gte: formattedOneWeekAgo,
                  $lte: formattedCurrentDate
                }
              },
              {
                fechafin: {
                  $gte: formattedOneWeekAgo,
                  $lte: formattedCurrentDate
                }
              }
            ]
          }
        },
        {
          $group: {
            _id: '$aula',
            tickets: { $sum: 1 }
          }
        }
      ];
  
      const ticketCounts = await db.collection('Tickets').aggregate(aggregationPipeline).toArray();
  
      // Send the ticket counts as JSON response
      response.json(ticketCounts);

    } catch (error) {
      console.error(error);
      response.status(500).send('Internal Server Error');
    }
  });
  


// Cuenta tickets por problema
app.get('/problemaTickets', async (request, response) => {
    try {
      const token = request.get('Authentication');
      const verifiedToken = await jwt.verify(token, "secretKey");
      const authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });

      if (authData.rol === "Administrador" || authData.rol === "Supervisor de Aula") {
        response.sendStatus(403); 
        return;
    }
      const currentDate = new Date();
      const oneWeekAgo = new Date(currentDate);
      oneWeekAgo.setDate(currentDate.getDate() - 7);
  
      const formattedOneWeekAgo = oneWeekAgo.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const formattedCurrentDate = currentDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const aggregationPipeline = [
        {
          $match: {
            $or: [
              {
                fechaCreacion: {
                  $gte: formattedOneWeekAgo,
                  $lte: formattedCurrentDate
                }
              },
              {
                fechafin: {
                  $gte: formattedOneWeekAgo,
                  $lte: formattedCurrentDate
                }
              }
            ]
          }
        },
        {
          $group: {
            _id: '$tipo',
            tickets: { $sum: 1 }
          }
        }
      ];
  
      const ticketCounts = await db.collection('Tickets').aggregate(aggregationPipeline).toArray();
  
      // Send the ticket counts as JSON response
      response.json(ticketCounts);

    } catch (error) {
      console.error(error);
      response.status(500).send('Internal Server Error');
    }
  });
  

//Cuenta tickets creados en los últimos 7 días
app.get('/ticketscreados', async (request, response) => {
    try {
      const token = request.get("Authentication");
      const verifiedToken = await jwt.verify(token, "secretKey");
      const authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });

      if (authData.rol === "Administrador" || authData.rol === "Supervisor de Aula") {
        response.sendStatus(403); 
        return;
    }
  
      const currentDate = new Date();
      const oneWeekAgo = new Date(currentDate);
      oneWeekAgo.setDate(currentDate.getDate() - 7);
  
      const formattedOneWeekAgo = oneWeekAgo.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const formattedCurrentDate = currentDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const aggregationPipeline = [
        {
          $match: {
            fechaCreacion: {
                $gte: formattedOneWeekAgo,
                $lte: formattedCurrentDate
              }
          }
        },
        {
          $count: "ticketsCreated"
        }
      ];
      const ticketCounts = await db.collection('Tickets').aggregate(aggregationPipeline).toArray();
  
      // Send the ticket counts per "aula" created in the last 7 days as JSON response
      response.json(ticketCounts);

    } catch (error) {
      console.error(error);
      response.status(500).send('Internal Server Error');
    }
  });
  
//Cuenta cuantos tickets terminados hay en los últimos 7 días
app.get('/ticketsfin', async (request, response) => {
    try {
      const token = request.get("Authentication");
      const verifiedToken = await jwt.verify(token, "secretKey");
      const authData = await db.collection("Usuarios").findOne({ "correo": verifiedToken.correo });

      if (authData.rol === "Administrador" || authData.rol === "Supervisor de Aula") {
        response.sendStatus(403); 
        return;
    }
  
      const currentDate = new Date();
      const oneWeekAgo = new Date(currentDate);
      oneWeekAgo.setDate(currentDate.getDate() - 7);
  
      const formattedOneWeekAgo = oneWeekAgo.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const formattedCurrentDate = currentDate.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const aggregationPipeline = [
        {
          $match: {
            fechafin: {
                $gte: formattedOneWeekAgo,
                $lte: formattedCurrentDate
              }
          }
        },
        {
          $count: "ticketsFin"
        }
      ];
      const ticketCounts = await db.collection('Tickets').aggregate(aggregationPipeline).toArray();
  
      // Send the ticket counts per "aula" created in the last 7 days as JSON response
      response.json(ticketCounts);

    } catch (error) {
      console.error(error);
      response.status(500).send('Internal Server Error');
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
    // console.log(request.body)

    let dataU=await db.collection('Usuarios').find({}).toArray();
    let idU=dataU.length+1;

    let data= await db.collection("Usuarios").findOne({"Usuario": correo});
    if(data==null){
        try{
            bcrypt.genSalt(10, (error, salt)=>{
                bcrypt.hash(pass, salt, async(error, hash)=>{
                    let usuarioAgregar={"id":idU,"correo": correo, "pass": hash, "nombreCompleto": fname, "rol": rol, "aula": {"nombreAula": nombreAula, "lugarAula": lugarAula, "sponsorAula": sponsorAula}};
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

https.createServer({
    cert: fs.readFileSync("backend.cer"),
    key: fs.readFileSync("backend.key"),
}, app).listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337")
})

// app.listen(1337, ()=>{
//     connectDB();
//     console.log("Servidor escuchando en puerto 1337")
// })