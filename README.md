<h1>Descripcion del proyecto</h1>
<p>
**QuickDineHub-Movil** es una aplicación móvil diseñada para ofrecer a los usuarios (comensales) una experiencia ágil y optimizada basada en las funcionalidades clave de la plataforma web QuickDineHub. La aplicación permitirá a los usuarios explorar dinámicamente el catálogo de productos, gestionar su carrito de compras y realizar un seguimiento detallado de sus pedidos. Con un enfoque en la facilidad de uso y el rendimiento en dispositivos móviles, QuickDineHub-Movil busca mejorar la accesibilidad y comodidad de la experiencia de los comensales en cualquier momento y lugar.
</p>

<h3>Objetivos:</h3>

<p>El objetivo principal de este proyecto es desarrollar una aplicación móvil basada en la plataforma web existente de QuickDineHub, centrada específicamente en las funcionalidades del perfil de "Comensal." La aplicación permitirá a los usuarios acceder de manera fácil e intuitiva a las funciones clave de la web, optimizando la experiencia de uso en dispositivos móviles.</p>

<h3>Objetivos específicos:</h3>

- Desarrollar una interfaz de usuario amigable y adaptable para la visualización dinámica del catálogo de productos, permitiendo a los comensales explorar los menús de manera eficiente.

- Implementar la funcionalidad del carrito de compras, facilitando la selección de productos y gestionando los pedidos directamente desde el dispositivo móvil.

- Desarrollar un sistema de seguimiento de pedidos, donde los usuarios puedan visualizar el estado de sus órdenes en tiempo real, desde la confirmación del pedido hasta su entrega.

- Garantizar una integración fluida con la plataforma web, asegurando consistencia en la información, datos y operaciones entre la aplicación móvil y la página web.

<h3>Metodología de trabajo:</h3>
<p>
La metodología utilizada para desarrollar este proyecto es **Extreme Programming (XP)** debido a su enfoque en la calidad del software y la adaptabilidad a los cambios. Dado que el proyecto implica la creación de una aplicación móvil que se basa en la funcionalidad existente de una plataforma web, XP permite una integración continua y un desarrollo ágil, lo que facilita ajustes rápidos basados en la retroalimentación del usuario. Además, prácticas como la programación en parejas y el desarrollo guiado por pruebas (TDD) aseguran que el código sea de alta calidad y fácil de mantener. La capacidad de liberar pequeñas versiones frecuentemente permite a los comensales experimentar mejoras y nuevas características en tiempo real, alineándose con las expectativas de un entorno de desarrollo dinámico y centrado en el usuario. En resumen, XP proporciona la flexibilidad y el enfoque en la colaboración necesaria para satisfacer las demandas del proyecto QuickDineHub-Movil.
</p>

<h1>Herramienta de control de versiones</h1>
<p>
Para el control de versiones del proyecto se seleccionaron las herramientas **Git y GitHub**, ya que ofrecen una gestión eficiente y robusta del código fuente, facilitando la colaboración entre los miembros del equipo. Git permite un seguimiento preciso de los cambios realizados en el código, lo que hace sencillo revertir a versiones anteriores si es necesario, y manejar ramas para el desarrollo de nuevas funcionalidades sin afectar la versión estable del proyecto. Por otro lado, GitHub proporciona un entorno colaborativo en línea, donde se pueden alojar repositorios, revisar y fusionar cambios mediante pull requests, y mantener una documentación clara del historial del proyecto. Además, ambas herramientas son ampliamente utilizadas en la comunidad de desarrollo, lo que garantiza una curva de aprendizaje accesible y un amplio soporte de la comunidad. En conjunto, Git y GitHub son fundamentales para mantener la integridad del código, fomentar la colaboración y asegurar un flujo de trabajo ágil y organizado en el desarrollo de QuickDineHub-Movil.
</p>

<h1>Estrategia de versionamiento y gestión de ramas:</h1>
<p>
La estrategia de versionamiento **GitHub Flow** es adecuada para el proyecto QuickDineHub-Movil, ya que se adapta perfectamente a un equipo pequeño y permite un flujo de trabajo ágil y sencillo. Con solo dos miembros en el equipo, GitHub Flow facilita la colaboración y la gestión de cambios, minimizando la complejidad del control de versiones. Esta estrategia se centra en la creación de ramas cortas y temporales para desarrollar nuevas características o correcciones de errores, lo que permite implementar cambios de manera rápida y continua. Además, la integración de Jira para el control de ramas y commits asegura que el progreso y las tareas estén bien documentados y alineados con los objetivos del proyecto.
</p>

- Creación de una rama: Al iniciar una nueva tarea o característica, el desarrollador crea una nueva rama desde la rama principal (main). Se debe nombrar la rama de manera descriptiva, reflejando la tarea o historia de usuario correspondiente en Jira:
```
git checkout -b nombre-de-la-rama
```
- Desarrollo y commits: Realiza los cambios necesarios en el código y utiliza commits regulares para guardar el progreso. Es importante incluir mensajes de commit claros que hagan referencia a las tareas en Jira:
```
git add .
git commit -m "Descripción de los cambios realizados [JIRA-123]"
```
- Revisión de la rama: Una vez completados los cambios, el desarrollador sube la rama a GitHub. Se crea un pull request en GitHub para solicitar la revisión de la rama por parte del otro miembro del equipo. El uso de Jira permite asociar el pull request con la tarea correspondiente, facilitando la revisión:
```
git push origin nombre-de-la-rama
```
-Fusión de la rama: Después de la revisión y la aprobación de los cambios, se procede a fusionar la rama en la rama principal (main) a través de GitHub, utilizando la opción de merge en el pull request. Una vez fusionados los cambios, se puede eliminar la rama de características:
```
git branch -d nombre-de-la-rama
```
- Actualización de la rama principal: Finalmente, el desarrollador se asegura de que la rama principal esté actualizada localmente:
```
git checkout main
git pull origin main
```
<h1>Estrategia de despliegue, entornos y proceso de CI/CD:</h1>

<p>
Despliegue Continuo: En el despliegue continuo, cada cambio que pasa la revisión y pruebas se implementa en producción. Esto permite a los equipos liberar nuevas funcionalidades y correcciones de errores rápidamente y de manera frecuente.

Ventajas:
</p>

- Feedback Rápido: Los usuarios pueden ver los cambios casi de inmediato, lo que facilita la obtención de comentarios y la adaptación a las necesidades del usuario.

- Menos Riesgo: Al desplegar cambios pequeños y manejables, se reduce el riesgo de que un despliegue grande falle, lo que facilita la identificación y corrección de errores.

- Iteración Ágil: Permite un ciclo de desarrollo más ágil, con nuevas características y mejoras que llegan a los usuarios de forma regular.

<h3>Entornos: </h3>

- Desarrollo → Los cambios se realizan y se realizan pruebas unitarias.
- Pruebas (QA) → Se hacen pruebas de integración y funcionalidad.
- Producción → Se despliegan los cambios aprobados y listos para el usuario final.


<h1>Pila tecnologica: </h1>
<p>
**MEAN**: se compone de MongoDB, Express.js, Angular y Node.js.
</p>

- Angular: Es el framework que estás utilizando para desarrollar la interfaz de usuario y manejar la lógica del frontend.
- Ionic: Es un framework que se construye sobre Angular y está diseñado específicamente para crear aplicaciones móviles híbridas. Te permite aprovechar el poder de Angular mientras utilizas componentes y herramientas que mejoran la experiencia móvil.
- Backend (Express y Node): Estos se encargan de manejar la lógica del servidor y la comunicación con la base de datos MongoDB.

<h1>Clonar el repositorio, instalar dependencias y ejecutar el proyecto:</h1>

- Clonar el Repositorio
```
git clone https://github.com/JJ1087/QuickDineHub-Movil.git
cd https://github.com/JJ1087/QuickDineHub-Movil.git
```

- Instalar Dependencias Asegúrate de tener Node.js y npm instalados. Luego, ejecuta:
```
npm install
```

- Ejecutar el Proyecto Inicia el servidor de desarrollo de Ionic:
```
ionic serve
```

- Abrir en el Navegador Accede a http://localhost:8100 en tu navegador para ver la aplicación en funcionamiento.
