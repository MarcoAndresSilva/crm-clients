# Arquitectura y Decisiones de Diseño del Proyecto CRM-Clients

Este documento detalla el proceso de desarrollo, las decisiones de arquitectura clave y los desafíos encontrados durante la construcción de la aplicación Full Stack CRM-Clients. El objetivo es servir como un registro técnico y una guía de aprendizaje.

## 1. Fase de Fundación y Objetivos del Proyecto

El proyecto nació con un objetivo claro: construir una aplicación de portafolio realista que demostrara competencias en el stack MEAN (MongoDB, Express, Angular, Node.js), con un enfoque específico en la **arquitectura tradicional de `NgModule` de Angular**, ya que es prevalente en muchos proyectos empresariales.

### 1.1. Configuración del Frontend (Angular)

-   **Creación del Proyecto:** Se utilizó el CLI de Angular v17+ con la bandera `--standalone=false` para generar explícitamente una estructura basada en `NgModule`.
-   **Estructura Modular:** Se adoptó una arquitectura modular profesional desde el inicio:
    -   `CoreModule`: Para servicios singleton, guards e interceptors.
    -   `SharedModule`: Para componentes reutilizables (como el diálogo de confirmación) y para centralizar la importación/exportación de `MaterialModule`.
    -   `LayoutModule`: Para encapsular la estructura visual principal de la aplicación (header, sidebar).
    -   `Features Modules` (ej. `ClientsModule`, `AuthModule`): Módulos de carga perezosa (`Lazy Loading`) para cada funcionalidad principal, mejorando el rendimiento de la carga inicial.
-   **UI con Angular Material:** Se eligió Angular Material para asegurar una interfaz de usuario consistente, profesional y accesible, siguiendo las guías de Material Design.

### 1.2. Configuración del Backend (Express.js)

-   **Stack:** Se optó por un backend con Node.js y Express.js por su minimalismo y flexibilidad, lo que permite un entendimiento profundo del flujo de peticiones HTTP, middlewares y enrutamiento.
-   **Base de Datos:** Se eligió **MongoDB Atlas** (DBaaS) para la base de datos NoSQL, facilitando el despliegue y la gestión. La conexión se realiza a través de **Mongoose** como ODM.
-   **Seguridad:** Las credenciales y claves secretas (URI de la base de datos, secreto de JWT) se gestionan de forma segura a través de variables de entorno con la librería `dotenv`.

## 2. Implementación del Flujo de Datos y Funcionalidades

### 2.1. CRUD de Clientes (Full Stack)

-   **Backend:** Se implementaron controladores y rutas para todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para el modelo `Client`.
-   **Frontend:** Se creó un `ClientService` como única fuente de verdad para la comunicación con la API. Los componentes (`ClientListComponent`, `ClientFormComponent`) son "tontos" en cuanto a la lógica de datos y solo delegan las acciones al servicio.
-   **Formularios Reactivos:** Se utilizó el `FormBuilder` de Angular para crear formularios robustos con validaciones del lado del cliente. El `ClientFormComponent` se diseñó para ser reutilizable tanto para la creación como para la edición de clientes.

### 2.2. Autenticación y Seguridad

-   **Backend:**
    -   Se implementó un sistema de autenticación basado en **JSON Web Tokens (JWT)**.
    -   Las contraseñas de los usuarios se hashean de forma segura antes de guardarlas en la base de datos, utilizando **bcrypt.js** a través de un middleware `pre-save` de Mongoose.
    -   Se creó un **middleware de protección (`protect`)** que verifica el token JWT en las cabeceras de las peticiones, asegurando que solo los usuarios autenticados puedan acceder a los endpoints del CRUD de clientes.
-   **Frontend:**
    -   **`AuthGuard`:** Se implementó un guardia de ruta para proteger las páginas principales, redirigiendo a los usuarios no autenticados a la página de login.
    -   **`HttpInterceptor`:** Se creó un interceptor para adjuntar automáticamente el token JWT a todas las peticiones salientes a la API, centralizando la lógica de autorización.
    -   **`AuthService` y Estado Global:** Se utilizó un `BehaviorSubject` en el `AuthService` para gestionar el estado de autenticación de forma reactiva en toda la aplicación, permitiendo que la UI (como el header) reaccione dinámicamente a los eventos de login y logout.
    -   **Persistencia de Sesión:** El estado del usuario se guarda en `localStorage` para mantener la sesión activa entre recargas de página.

### 2.3. Mejoras de Experiencia de Usuario (UX)

-   **Paginación del Lado del Servidor:** Para manejar eficientemente grandes volúmenes de datos, el endpoint `GET /api/clients` y la tabla del frontend se modificaron para soportar paginación.
-   **Estado Reactivo Inter-Componentes:** Se implementó un `Subject` en el `ClientService` para desacoplar los componentes. Cuando una acción en un componente (ej. `ClientFormComponent`) modifica los datos, emite una notificación. El `ClientListComponent` escucha esta notificación y se recarga, siguiendo un patrón de diseño reactivo y escalable.
-   **Feedback Visual:** Se añadieron spinners de carga (`MatProgressSpinner`), notificaciones de éxito/error (`MatSnackBar`) y diálogos de confirmación (`MatDialog`) para proporcionar una experiencia de usuario clara y profesional.

## 3. Desafíos Clave y Soluciones

Durante el desarrollo, surgieron varios desafíos técnicos que fueron cruciales para el aprendizaje.

-   **Problema: Errores de Módulos con Componentes de Material**
    -   **Síntoma:** El `ConfirmDialogComponent` se mostraba sin estilos de Angular Material.
    -   **Diagnóstico:** El componente fue declarado en un módulo (`AppModule`) que no tenía acceso a los módulos de Material.
    -   **Solución:** Se creó un `SharedModule` que importa y re-exporta `MaterialModule` y declara los componentes compartidos. Cualquier `Feature Module` que necesite estos componentes ahora solo importa `SharedModule`, siguiendo las mejores prácticas de arquitectura modular.

-   **Problema: Error de "Ramas Divergentes" en Git**
    -   **Síntoma:** `git push` era rechazado con un error `non-fast-forward`.
    -   **Diagnóstico:** El historial del repositorio remoto en GitHub contenía commits que no estaban en el historial local, creando dos líneas de tiempo paralelas.
    -   **Solución:** Se utilizó `git pull origin main --no-rebase` para descargar los cambios remotos y crear un "commit de merge" que unificó ambas historias. Esto permitió que el `push` posterior fuera exitoso.

-   **Problema: Fallo en el Despliegue del Backend en Render**
    -   **Síntoma:** El `build` fallaba con errores `Cannot find module` o `Could not find a declaration file`.
    -   **Diagnóstico:** El comando `npm install` en el entorno de producción de Render no instalaba las `devDependencies`, donde se encontraban los paquetes de tipos (`@types/...`) necesarios para la compilación de TypeScript.
    -   **Solución:** Se movieron los paquetes de tipos esenciales (`@types/express`, `@types/jsonwebtoken`, etc.) de `devDependencies` a `dependencies` en el `package.json` del servidor, asegurando que siempre se instalen.

## 4. Despliegue

La aplicación se desplegó utilizando una arquitectura de tres capas en la nube:
-   **Frontend (Angular):** Desplegado en **Netlify**, una plataforma optimizada para sitios estáticos y SPAs.
-   **Backend (Express API):** Desplegado en **Render.com**, una plataforma como servicio (PaaS) que soporta aplicaciones Node.js.
-   **Base de Datos (MongoDB):** Alojada en **MongoDB Atlas**, la solución de base de datos en la nube de MongoDB.

Este enfoque desacoplado es moderno, escalable y refleja las arquitecturas utilizadas en entornos de producción reales.