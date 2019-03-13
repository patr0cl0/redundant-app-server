import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

// default middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing

app.use('/', (req, res) => {
  const text = req.body.text || req.query.text;

  if (!text) {
    return res.status(400).json({
      message: 'Missing prop \'text\' on body payload and query',
    });
  }

  res.send(text);
});

export default app;
