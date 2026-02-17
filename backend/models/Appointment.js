const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientName: String,
    doctorName : String,
    department:String,
    data:Date,
    time:String,
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
});
module.exports = mongoose.model("Appointment",appointmentSchema);