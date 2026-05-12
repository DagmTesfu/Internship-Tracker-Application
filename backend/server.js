const express = require("express");
const cors = require("cors");
const supabase = require("./supabaseClient");

const app = express();
const PORT = 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", function (req, res) {
  res.send("Internship Backend is Running");
});


app.get("/api/test", function (req, res) {
  res.json({ message: "Express test route works" });
});


// GET all applications
app.get("/api/application", async function (req, res) {
    console.log("GET /api/application was called");
  const { data, error } = await supabase
    .from("application")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
});

// POST new application
app.post("/api/application", async function (req, res) {
  if (!req.body.company || !req.body.position) {
    return res.status(400).json({
      message: "Company and position are required"
    });
  }

  const newApp = {
    id: Date.now(),
    company: req.body.company,
    position: req.body.position,
    deadline: req.body.deadline || null,
    description: req.body.description,
    status: req.body.status
  };

  const { data, error } = await supabase
    .from("application")
    .insert([newApp])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(data);
});

// DELETE application
app.delete("/api/application/:id", async function (req, res) {
  const id = Number(req.params.id);

  const { error } = await supabase
    .from("application")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ message: "Application deleted successfully" });
});

// UPDATE application
app.put("/api/application/:id", async function (req, res) {
  const id = Number(req.params.id);

  if (!req.body.company || !req.body.position) {
    return res.status(400).json({
      message: "Company and position are required"
    });
  }

  const updatedApp = {
    company: req.body.company,
    position: req.body.position,
    deadline: req.body.deadline || null,
    description: req.body.description,
    status: req.body.status
  };

  const { data, error } = await supabase
    .from("application")
    .update(updatedApp)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
});

app.listen(PORT, function () {
  console.log(`Server is Running on http://localhost:${PORT}`);
});