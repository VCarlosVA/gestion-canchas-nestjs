import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // RNF-02: Usabilidad -> mensajes de validación claros y automáticos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora campos que no están en el DTO
      forbidNonWhitelisted: true, // rechaza campos desconocidos
      transform: true, // convierte tipos automáticamente (ej: string -> number)
    }),
  );

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
