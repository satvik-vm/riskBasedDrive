require('dotenv').config();

const express = require('express');
import { Client } from '@duosecurity/duo_universal';

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server is listening on ${PORT}`)
});

const client = new Client({
	clientId: process.env.,
	clientSecret: 'yourDuoApplicationSecret',
	apiHost: 'api-12345678.duosecurity.com',
	redirectUrl: 'http://localhost:3000/redirect',
});