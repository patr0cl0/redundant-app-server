import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

const {
  PORT = 8000
} = process.env;

// default middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Send back all the request with
app.use('/', (req, res) => {
  const text = req.body.text || req.query.text;

  if (!text) {
    res.status(400).json({
      message: 'Missing prop \'text\' on body payload and query',
    });
  }

  res.send(text);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
