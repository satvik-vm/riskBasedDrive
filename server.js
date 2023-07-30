require('dotenv').config();

const express = require('express');
const useragent = require('express-useragent');
const connectDB = require('./config/db');
const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

const app = express();

app.use(useragent.express());

const PORT = process.env.PORT || 3000;

connectDB();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use("/api", require("./routes/auth"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
// 		console.log(req);
// 		// const userName = req.body.userName;
// 		// const dir = path.join('./uploads/', userName);
// 		// fs.mkdir(dir);
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage })

// app.post('/upload', upload.single('file'), (req, res) => {
// 	if (!req.file) {
// 		return res.status(400).json({ error: 'No file uploaded' });
//   }
//   res.json({ message: 'File uploaded successfully', filename: req.file.filename });
// });

// app.get('/download', (req, res) => {
// 	const userName = req.body.userName;
// 	const dir = path.join('./uploads/', userName);
//   const file = path.join(dir, "/" + req.body.filename);
//   res.download(file, (err) => {
//     if (err) {
//       res.status(404).json({ error: 'File not found' });
//     }
//   });
// });

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});