// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config()

// const express = require('express');
import express from 'express'
import { Client } from '@duosecurity/duo_universal';

const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`)
});

app.get("/", (req, res) => {
	res.status(200).json({
		name: "satvik",
		type: "string"
	})
})

// const client = new Client({
// 	clientId: process.env.INTEGRATION_KEY,
// 	clientSecret: process.env.SECRET_KEY,
// 	apiHost: process.env.API_HOSTNAME,
// 	redirectUrl: 'http://localhost:3000/redirect',
// });

// const status = await client.healthCheck();
// console.log(status)