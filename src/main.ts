import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de CORS
  app.enableCors();

  // Configuración global de prefijo de ruta
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Solo permite propiedades especificadas en la clase DTO
    forbidNonWhitelisted: true, // Lanza una excepción si se encuentra una propiedad no especificada
    transform: true, // Convierte el payload a una instancia del DTO
  }));

  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);


  // Iniciar la aplicación en el puerto 3000
  await app.listen(3000);
}
bootstrap();
