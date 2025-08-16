# CRM-Clients: Aplicación Full Stack de Gestión de Clientes

<img width="1914" height="401" alt="image" src="https://github.com/user-attachments/assets/0e233b3b-18d4-4f01-ae9a-2bc230ca9685" />
<img width="1896" height="462" alt="image" src="https://github.com/user-attachments/assets/60266c28-ea81-4607-aef4-3c0cd8d46901" />



Una aplicación web completa y robusta para la gestión de clientes (CRM), construida con el stack MEAN (MongoDB, Express, Angular, Node.js). Este proyecto fue desarrollado como una pieza central de portafolio para demostrar habilidades en el desarrollo Full Stack, desde la arquitectura del frontend con Angular y `NgModule` hasta la creación de una API RESTful segura con Express y la integración con una base de datos NoSQL.

**[➡️ Ver Demo en Vivo](https://crm-clients-fullstack.netlify.app/)** 

---

## 🚀 Features (Funcionalidades Clave)

-   **Autenticación de Usuarios:** Sistema de registro y login seguro utilizando JSON Web Tokens (JWT). Las contraseñas se almacenan de forma segura mediante hasheo con bcrypt.
-   **CRUD Completo de Clientes:** Funcionalidad completa para Crear, Leer, Actualizar y Eliminar clientes.
-   **Protección de Rutas:** Tanto las rutas del frontend como los endpoints de la API están protegidos, asegurando que solo los usuarios autenticados puedan acceder a los datos.
-   **Paginación del Lado del Servidor:** La lista de clientes maneja grandes volúmenes de datos de forma eficiente, cargando la información por páginas.
-   **Dashboard de Métricas:** Una página principal que muestra estadísticas clave, como el número total de clientes y los más recientes.
-   **Experiencia de Usuario Mejorada:** La interfaz incluye indicadores de carga (spinners), notificaciones (snackbars) para acciones y diálogos de confirmación para operaciones destructivas.
-   **Diseño Responsivo:** La aplicación está diseñada para ser completamente funcional y visualmente atractiva en dispositivos de escritorio y móviles.

---

## 🛠️ Stack Tecnológico

Esta sección detalla las tecnologías, librerías y herramientas utilizadas en el proyecto.

### **Frontend**

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![Angular Material](https://img.shields.io/badge/angular_material-7B1FA2?style=for-the-badge&logo=angular&logoColor=white)
![SCSS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

-   **Angular (v17+):** Framework principal del frontend, utilizando una arquitectura modular con `NgModule` para alinearse con prácticas comunes en proyectos empresariales.
-   **TypeScript:** Lenguaje principal para un desarrollo robusto y tipado.
-   **RxJS:** Para la gestión de la programación reactiva y el manejo de eventos asíncronos.
-   **Angular Material:** Librería de componentes para una UI moderna y consistente.
-   **SCSS:** Preprocesador de CSS para estilos más organizados y mantenibles.

### **Backend**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

-   **Node.js:** Entorno de ejecución para JavaScript/TypeScript en el servidor.
-   **Express.js:** Framework minimalista para construir la API RESTful.
-   **MongoDB Atlas:** Base de datos NoSQL en la nube para persistencia de datos.
-   **Mongoose:** ODM para modelar y interactuar con MongoDB de forma estructurada.
-   **JSON Web Tokens (JWT):** Para la implementación de la autenticación sin estado.
-   **Bcrypt.js:** Para el hasheo seguro de contraseñas.

### **Herramientas y Entorno**

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

---

## ⚙️ Instalación y Ejecución Local

Para clonar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

### **Prerrequisitos**

-   [Node.js](https://nodejs.org/) (versión 18.x o superior)
-   [Angular CLI](https://angular.io/cli) (versión 17.x o superior)
-   Una cuenta de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para la base de datos.

### **Pasos**

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/TU_USUARIO/crm-clients.git
    cd crm-clients
    ```

2.  **Configura el Backend:**
    -   Navega a la carpeta del servidor: `cd server`
    -   Instala las dependencias: `npm install`
    -   Crea un fichero `.env` en la raíz de la carpeta `server` y añade las siguientes variables:
        ```env
        MONGO_URI=TU_CADENA_DE_CONEXION_DE_MONGODB_ATLAS
        JWT_SECRET=UNA_CLAVE_SECRETA_LARGA_Y_ALEATORIA
        ```
    -   Inicia el servidor de backend (se ejecutará en `http://localhost:3000`):
        ```bash
        npm run dev
        ```

3.  **Configura el Frontend:**
    -   Abre una **nueva terminal** en la raíz del proyecto (`crm-clients`).
    -   Instala las dependencias: `npm install`
    -   Inicia la aplicación de Angular (se ejecutará en `http://localhost:4200`):
        ```bash
        ng serve
        ```

4.  **¡Listo!** Abre tu navegador y ve a `http://localhost:4200`.

---

## 📝 Próximos Pasos

Aunque el proyecto está completo en sus funcionalidades principales, hay varias mejoras que podrían implementarse en el futuro:

-   [ ] Búsqueda y filtrado en la lista de clientes.
-   [ ] Roles de usuario (ej. Admin vs. Usuario normal).
-   [ ] Añadir un modelo de "Interacciones" para registrar notas por cliente.
-   [ ] Subida de archivos (ej. foto de perfil del cliente).
