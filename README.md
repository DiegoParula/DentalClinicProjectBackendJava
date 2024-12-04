Sistema de Reserva de Turnos
Este proyecto consiste en el desarrollo de un sistema de gestión para la reserva de turnos en una clínica odontológica. El sistema permite gestionar la información de los odontólogos, pacientes y turnos, de acuerdo a los requisitos detallados a continuación.

Requerimientos
Funcionalidades principales:
Administración de Odontólogos:

Listar, agregar, modificar y eliminar odontólogos.
Registrar el apellido, nombre y matrícula de los odontólogos.
Administración de Pacientes:

Listar, agregar, modificar y eliminar pacientes.
Almacenar: nombre, apellido, domicilio, DNI y fecha de alta de cada paciente.
Reserva de Turnos:

Asignar un turno a un paciente con un odontólogo a una fecha y hora determinada.

Requerimientos técnicos
Este sistema está desarrollado utilizando Java y Spring Boot, siguiendo una arquitectura en capas:

Capa de entidades de negocio:

Modela el negocio con clases Java utilizando el paradigma orientado a objetos.
Capa de acceso a datos (Repository):

Las clases encargadas de acceder a la base de datos. Utiliza Spring Data JPA para facilitar la interacción con la base de datos.
Capa de datos (base de datos):

Utiliza H2 como base de datos embebida para almacenamiento local de datos.
Capa de negocio:

Las clases Service desacoplan la lógica de negocio del acceso a datos y de la capa de presentación.
Capa de presentación:

Desarrollada con Spring Boot MVC para exponer controladores y vistas en HTML y JavaScript.
Manejo de Excepciones:

El sistema incluye un manejo adecuado de excepciones para garantizar que las operaciones fallidas se manejen de manera controlada, mostrando mensajes adecuados al usuario.

Base de datos H2
El proyecto utiliza H2 como base de datos embebida. Puedes acceder a la consola de H2 en la siguiente URL:
http://localhost:8080/h2-console

Estructura del Proyecto
1. Capa de Entidades (Entity)
Odontologo: Representa a los odontólogos con los campos: id, nombre, apellido, matrícula.
Paciente: Representa a los pacientes con los campos: id, nombre, apellido, dni, fecha de alta, domicilio.
Turno: Representa a los turnos con los campos: id, paciente, odontólogo, fecha y hora del turno.
2. Capa de Repositorios (Repository)
OdontologoRepository: Interfaz para interactuar con la base de datos de odontólogos.
PacienteRepository: Interfaz para interactuar con la base de datos de pacientes.
TurnoRepository: Interfaz para interactuar con la base de datos de turnos.
3. Capa de Servicios (Service)
OdontologoService: Contiene la lógica de negocio para gestionar odontólogos.
PacienteService: Contiene la lógica de negocio para gestionar pacientes.
TurnoService: Contiene la lógica de negocio para gestionar la reserva de turnos.
4. Capa de Controladores (Controller)
OdontologoController: Expondrá las rutas HTTP para realizar las operaciones CRUD sobre odontólogos.
PacienteController: Expondrá las rutas HTTP para realizar las operaciones CRUD sobre pacientes.
TurnoController: Expondrá las rutas HTTP para registrar y gestionar turnos.
Manejo de Excepciones
El sistema implementa un manejo adecuado de excepciones para capturar los errores comunes.

Documentación de la API
La documentación de la API está disponible a través de Swagger. Puedes acceder a la documentación de la API en:
http://localhost:8080/swagger-ui.html

Colección de Postman
La colección de Postman para probar las API de este proyecto se encuentra en la carpeta postman del repositorio. Puedes importar esta colección directamente en Postman para realizar pruebas sobre las rutas expuestas por el sistema.
