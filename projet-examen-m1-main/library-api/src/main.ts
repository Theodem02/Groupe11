import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';  
import { swaggerOptions } from './swaggerOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document); // 'docs' est le chemin d'accès à Swagger UI

  await app.listen(3000);
}

bootstrap();
