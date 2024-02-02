import mongoose from 'mongoose';
import {ApplicationConfig, StarterApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new StarterApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  const uri =
    'mongodb+srv://vipindixit:aadya_0916@cluster0.pqtzicg.mongodb.net/?retryWrites=true&w=majority';

  mongoose
    .connect(uri)
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log(err));
  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
