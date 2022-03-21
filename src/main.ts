import express from 'express';

const app = express();

app.get('/api/hello', function (_, res) {
    res.send('Hello World');
});

app.listen(3000);
