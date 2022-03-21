import express from 'express';

const app = express();

app.get('/api/hello', function (_, res) {
    res.send('Hello World');
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('App is running...')
});
