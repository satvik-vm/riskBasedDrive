require('dotenv').config();

const express = require('express');
const useragent = require('express-useragent');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

app.use(useragent.express());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});

connectDB();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use("/api", require("./routes/auth"));

// app.get("/", (req, res) => {
// 	console.log(req);
// 	res.status(201).json({
// 		name: "satvik",
// 	})
// 	var datetime = new Date();
// 	console.log(datetime.toISOString().slice(0,10), datetime.toISOString().slice(11,19));
// });