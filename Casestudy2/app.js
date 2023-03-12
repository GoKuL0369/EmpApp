// Task1: initiate app and run server at 3000

const Express = require("express")
const BodyParser = require("body-parser")
const Cors = require("cors")
const Mongoose = ("mongoose")
const path=require('path');
const app =Express()
const PORT = process.env.PORT; //3000
const {empmodel} = require("./model/employee")

app.use{Cors()}
app.use{BodyParser.json()}
app.use{BodyParser.urlencoded({extended : true})}

app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));



// Task2: create mongoDB connection 

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


Mongoose.connect("mongodb+srv://gokulgk647:Gokul2001@cluster0.nflfpth.mongodb.net/?retryWrites=true&w=majority",{useNewUrlparser: true})
.then(() => {
    console.log("Database Connected!");
  })
  .catch(() => {
    console.log("Error connecting");
  });



//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employee", async (req, res) => {
    let data = await empmodel.find()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.sed(err);
    });
  });


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employee/:id", async (req, res) => {
    let data = await empmodel.findById(req.params.id)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.sed(err);
    });
  });



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


app.post("/api/employee", async (req, res) => {
    var data = new empmodel(req.body);
    data.save().then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.sed(err);
    });
  });



//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employee/:id", async (req, res) => {
    let data = await empmodel
      .findByIdAndDelete(req.params.id)
      .then((result) => {
        res.json({ status: "ok", result: result });
      })
      .catch((err) => {
        res.send(err);
      });
  });



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employee/:id", async (req, res) => {
    let data = await empmodel
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body
      )
      .then((doc) => {
        res.json({ status: "ok", result: req.body });
      })
      .catch((err) => {
        res.send(err);
      });
  });
//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



