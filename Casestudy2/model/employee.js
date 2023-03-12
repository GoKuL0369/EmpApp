const Mongoose = ("mongoose")
const empSchema = new Mongoose.Schema
(
    {

        name : String,
        location : String,
        position : String,
        salary : Number
     }
)
const employeeModel=Mongoose.model("Employees",empSchema)

module.exports ={employeeModel}
