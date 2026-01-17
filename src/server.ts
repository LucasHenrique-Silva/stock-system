import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { errorHandler } from './middleware/ErrorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./routes/Routes').Routes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});