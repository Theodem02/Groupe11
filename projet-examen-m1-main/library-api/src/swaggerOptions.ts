import { DocumentBuilder } from '@nestjs/swagger';

const options = new DocumentBuilder()
  .setTitle('Mon API')
  .setDescription('Description de mon API')
  .setVersion('1.0.0')
  .addBearerAuth() // Si vous utilisez l'authentification JWT, par exemple
  .build();

export const swaggerOptions = {
  ...options,
  apis: ['./controllers/**/*.ts', './repositories/**/*.ts', './useCases/**/*.ts'],
};


