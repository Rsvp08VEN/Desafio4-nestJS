import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:3000'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración de Helmet
  app.use(
    helmet({
      // Configura políticas según tus necesidades
      contentSecurityPolicy: false, // Desactiva CSP si afecta a tu frontend
    }),
  );


  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();
