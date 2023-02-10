const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { connect } = require('./src/helpers/db/connect');

const { setUpCloudinary } = require('./src/helpers/cloudinary,js');

const AdminRoutes = require('./src/api/admin/admin.routes');
const GameRoutes = require('./src/api/game/game.routes');
const UserRoutes = require('./src/api/user/user.routes');

const { setError } = require('./src/helpers/error/handle.error');

connect();
setUpCloudinary();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  }),
);

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.set('secretKey', process.env.SECRET_KEY_JWT);

app.use('/api/admin', AdminRoutes);
app.use('/api/game', GameRoutes);
app.use('/api/user', UserRoutes);

app.use('*', (req, res, next) => next(setError(404, 'Route not found')));

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

app.disable('x-powered-by');

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: http://localhost:${process.env.PORT}`);
});
