# GCV Platform Frontend

## Descripción

Este proyecto corresponde al **frontend** de la prueba técnica. Es la interfaz de usuario de la aplicación y permite gestionar el flujo de creación, revisión, aprobación y consulta de novedades según el rol del usuario autenticado.

La aplicación implementa control de acceso basado en roles y garantiza que cada usuario solo pueda visualizar y gestionar la información correspondiente a su **filial**. Todas las consultas y operaciones se encuentran filtradas por `filialId`.

## Funcionalidades

### Colaborador

- Crear novedades.
- Guardar una novedad como **borrador** al cancelar su creación.
- Editar y enviar posteriormente los borradores para aprobación.
- Consultar únicamente sus propias novedades.

### Supervisor

- Consultar las novedades de los colaboradores pertenecientes a su filial.
- Aprobar o rechazar novedades.
- Realizar aprobación masiva de novedades.

### Recursos Humanos (RR. HH.)

- Consultar todas las novedades de su filial.
- Exportar la información de novedades.

## Características

- **Autenticación mediante JWT Bearer Token.**
- **Control de acceso basado en roles**, adaptando la interfaz según el perfil autenticado (Colaborador, Supervisor o RR. HH.). La UI muestra únicamente las acciones permitidas para cada tipo de usuario.
- **Aislamiento por filial**, garantizando que toda la información mostrada y las operaciones realizadas correspondan únicamente a la filial del usuario autenticado.
- **Persistencia de filtros en la URL**, permitiendo conservar el estado de búsqueda al recargar la página o compartir el enlace.
- **Manejo de formularios con React Hook Form**, facilitando la validación y administración del estado de los formularios.
- **Gestión de caché y sincronización de datos con React Query (TanStack Query)** para optimizar las peticiones al servidor y mejorar la experiencia del usuario.
- **Uso de Custom Hooks** para reutilizar lógica y mejorar la organización y legibilidad del código.
- **Axios** para la comunicación con la API REST.
- **shadcn/ui** para la construcción de la interfaz de usuario.

## Tecnologías

- React
- TypeScript
- React Router
- TanStack Query (React Query)
- React Hook Form
- Axios
- shadcn/ui
- Tailwind CSS

## Instalación

1. Clona el repositorio.

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Instala las dependencias.

```bash
npm install
```

3. Crea un archivo `.env` tomando como referencia el archivo `.env.template`.

```bash
cp .env.template .env
```

4. Configura las variables de entorno.

5. Inicia la aplicación.

```bash
npm run dev
```

## Consideraciones

- La interfaz cambia dinámicamente según el rol del usuario autenticado.
- Todas las consultas se encuentran restringidas por la **filial** del usuario.
- Los colaboradores pueden guardar una novedad como **borrador** y editarla posteriormente antes de enviarla para aprobación.
- Los filtros se almacenan en la URL para mantener el estado de la aplicación entre recargas.
