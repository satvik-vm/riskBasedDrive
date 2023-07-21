require('dotenv').config();

const express = require('express');
var useragent = require('express-useragent');

const app = express();

app.use(useragent.express());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`)
});

app.get("/", (req, res) => {
	console.log(req.useragent['source'])
	res.status(201).json({
		name: "satvik",
	})
})