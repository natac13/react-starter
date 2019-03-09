import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import http from 'http';

/** Routes */
import routes from './routes';

/** Database Connection */
import connectToDB from './dbConnection';

require('dotenv').config();

const env = process.env.NODE_ENV;
const port = process.env.SERVER_PORT || 3003;

// connect to DB
connectToDB(env, process.env.MONGO_URI);

const app = express();
app.use(cors());
// body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use(routes);

app.set('port', port);

if (env === 'production') {
  const BUILD_PATH = path.resolve(__dirname);
  const HTML_INDEX = path.resolve(__dirname, 'index.html');
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
  app.use(compression());
  app.use(express.static(BUILD_PATH));
  // base route
  app.get('*', (req, res) => {
    res.sendFile(HTML_INDEX);
  });

  const server = http.createServer(app);

  server.listen(port, () =>
    console.log(chalk.green('Server Running on port '), chalk.bold(port))
  );
} else {
  // logging
  app.use(morgan('dev'));
  // base route
  app.get('*', (req, res) => {
    res.json({ error: 'Unknown Route' });
  });
  app.listen(port, 'localhost', () => {
    console.log(chalk.red('\n-----------------------------------------------'));
    console.log(chalk.green('        Development Server Running:'));
    console.log('        ' + chalk.underline.cyan(`http://localhost:${port}`));
    console.log(chalk.red('-----------------------------------------------'));
  });
}

export default app;
