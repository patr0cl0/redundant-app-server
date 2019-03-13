import app from './server';

function bootstrap() {
  const {
    PORT = 8000
  } = process.env;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
