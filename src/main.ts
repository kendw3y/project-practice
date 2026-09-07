import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const config = new DocumentBuilder()
    .setTitle('Task API')
    .setDescription('The task API description')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    transformOptions:{
      enableImplicitConversion:true
    }
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
