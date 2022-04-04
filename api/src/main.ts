import express from 'express';

const app = express();

app.get('/', (_, res) => {
    res.send('Welcome to the Tejodoro app! This made by Ronny and Fran');
});

app.get('/api/hello', function (_, res) {
    res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(Number(port), '0.0.0.0', () => {
    console.log(`App is running in ${port}...`);
});
