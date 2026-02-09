const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const EmployeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", EmployeeSchema);

app.get("/api/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post("/api/employees", async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
