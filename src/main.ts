const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  }
  
  bootstrap();
  
  console.log(`Worker ${process.pid} started`);
}
