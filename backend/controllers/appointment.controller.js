const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    const doctorList = doctors.map((d) => ({
      name: d.name,
      department: d.department
    }));
    res.json(doctorList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { doctorName, department, date, time } = req.body;

    const appointment = await Appointment.create({
      patientName: req.user.name,
      doctorName,
      department,
      date,
      time
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientName: req.user.name
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorName: req.user.name
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
