const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const { port } = require('./src/config/config');
const { connectToDB } = require('./src/config/db.config');
const { errorHandler } = require('./src/uitls/errorHandler');

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(fileUpload());
app.use(cors());

const studentRoutes = require('./src/routes/v1/studentRoutes');

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", studentRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Student App is Up and Running</h1>");
});

// Last middleware if any error comes
app.use(errorHandler);

app.listen(port, async() => {
    console.log("Server is running at port", port);

    await connectToDB();
    console.log("Database connected");
});

