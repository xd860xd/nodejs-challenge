Challenge
API REST que permita el funcionamiento de un sistema de gestiónde tareas, utilizando Node.js (Nestjs)

Instalación

    Clonar el repositorio.
    Ejecutar npm install para instalar las dependencias.
    Correr la db ($ docker-compose up -d)

Uso

Ejecutar npm start:dev para iniciar el servidor.

La aplicación se ejecutará en http://localhost:3000 por defecto.
Configuración

Las variables de entorno necesarias son:

    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=postgres
    DATABASE_PASSWORD=password
    DATABASE_NAME=TASKS_DB


Endpoints
La documentacion de estos se puede encontrar en http://localhost:3000/swagger

Postman
La collecion de postman se puede cargar mediante el archivo
test-bap.postman_collection.json