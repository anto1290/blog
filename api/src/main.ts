import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.APP_PORT || 5000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`Server Nest js running on Port : ${port}`);
  });
}
bootstrap();
