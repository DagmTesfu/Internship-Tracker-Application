const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

let application = [];

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", function(req, res){
    res.send("Internship Backend is Running");
});

app.get("/api/application", function(req, res){
    res.json(application);
});

app.post("/api/application", function(req, res){
    const newApp = {
        id:Date.now(),
        company: req.body.company,
        position: req.body.position,
        deadline: req.body.deadline,
        description: req.body.description,
        status: req.body.status
    };

    application.push(newApp);
    res.status(201).json(newApp);
})

app.delete("/api/application/:id", function (req, res) {
    const id = Number(req.params.id);

    application = application.filter(function (app) {
        return app.id !== id;
    });

    res.json({ message: "Application deleted successfully" });
});

app.listen(PORT, function(){
    console.log(`Server is Running on http://localhost:${PORT}`);
});