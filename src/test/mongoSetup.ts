import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';

const mongoServer = new MongoMemoryServer();

const connectionPromise = new Promise((resolve, reject) => {
  mongoServer.start()
    .then(() => {
      const mongoUri = mongoServer.getUri();
      const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000,
      };
      mongoose.connect(mongoUri, mongooseOpts as ConnectOptions);

      mongoose.connection.on('connected', () => {
        resolve(mongoose.connection);
      });

      mongoose.connection.on('error', (err) => {
        console.error('Mockgoose error');
        console.error(err);

        if (err.message.code === 'ETIMEDOUT') {
          mongoose.connect(mongoUri, mongooseOpts);
        }
      });

      return null;
    })
    .catch((err) => {
      console.error('Error in prepareStorage');
      console.error(err);
      reject(err);
    });
});

/**
 * This promise is resolved when the test database
 * is ready and the connection has been made.
 */
export default connectionPromise;
