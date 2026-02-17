const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");

const {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllDoctors
} = require("../controllers/appointment.controller");

router.get("/doctors", getAllDoctors);
router.post("/appointment", protect(["patient"]), createAppointment);
router.get("/my-appointments", protect(["patient"]), getMyAppointments);

router.get(
  "/doctor-appointments",
  protect(["doctor"]),
  getDoctorAppointments
);

router.put(
  "/appointment/:id",
  protect(["doctor"]),
  updateAppointmentStatus
);

module.exports = router;
