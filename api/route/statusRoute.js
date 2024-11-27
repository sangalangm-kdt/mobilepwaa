const express = require("express");
const router = express.Router();

// Your status options with sequential IDs
const cylinderStatus = [
  { id: 1, cylinderStatus: "Storage" },
  { id: 2, cylinderStatus: "Material and Machining" },
  { id: 3, cylinderStatus: "Disassembly" },
  { id: 4, cylinderStatus: "Grooving" },
  { id: 5, cylinderStatus: "LMD" },
  { id: 6, cylinderStatus: "Finishing" },
  { id: 7, cylinderStatus: "Assembly" },
  { id: 8, cylinderStatus: "Process" },
  { id: 9, cylinderStatus: "Mounted" },
  { id: 10, cylinderStatus: "Dismounted" },
  { id: 11, cylinderStatus: "Disposal" },
];

// Endpoint to get cylinder status options
router.get("/cylinder-status", (req, res) => {
  res.json(cylinderStatus);
});

module.exports = router;
