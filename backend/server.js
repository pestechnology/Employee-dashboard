const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/employee_dashboard")
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

const EmployeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", EmployeeSchema);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/api/employees", async (req, res) => {
  try {
    res.json(await Employee.find());
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.json(employee);
  } catch {
    res.status(500).json({ message: "Save failed" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
