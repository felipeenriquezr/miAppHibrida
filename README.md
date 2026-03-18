# MiAppHibrida 📱

Una aplicación hibrida construida con **Ionic** y **Angular 20** que se ejecuta en web, iOS y Android mediante Capacitor. Incluye autenticación JWT con interceptor HTTP automático.

## 🚀 Requisitos Previos

Antes de clonar y ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js 20+** (LTS recomendado)
  - Descarga desde: https://nodejs.org/
  - Verifica: `node --version`
- **npm 10+** (incluido con Node.js)
  - Verifica: `npm --version`
- **Git**
  - Descarga desde: https://git-scm.com/
  - Verifica: `git --version`
- **Angular CLI 20** (se instala con npm)
- **Ionic CLI**
  - Instala globalmente: `npm install -g @ionic/cli`
  - Verifica: `ionic --version`

### Requisitos Adicionales (Opcional)

Si deseas compilar para Android/iOS:
- **Java Development Kit (JDK) 11+** para Android
- **Android SDK** con API 35+
- **Xcode** para iOS (macOS only)

---

## 📥 Instalación del Repositorio

### 1. Clonar el Repositorio

```bash
git clone https://github.com/felipeenriquezr/miAppHibrida.git
cd miAppHibrida/MiAppHibrida
```

### 2. Instalar Dependencias

```bash
npm install
```

Este comando instala:
- Dependencias de Angular (core, router, forms)
- Ionic Framework
- Capacitor (para build nativo)
- RxJS (manejo reactivo)
- Dependencias de desarrollo (TypeScript, ESLint, pruebas)

⏱️ Tiempo aproximado: 2-5 minutos (depende de tu conexión)

---

## ⚙️ Configuración Local

### Puertos Necesarios

- **Desarrollo Web**: `http://localhost:8100` (Angular dev server)
- **Backend API**: `http://localhost:3000` (configurado en AuthService)

### Variables de Entorno

El proyecto actualmente está configurado para modo **desarrollo**. Si necesitas cambiar la URL del API:

1. Abre `src/app/auth.service.ts`
2. Busca la línea: `private apiUrl = 'http://localhost:3000';`
3. Cambia la URL según tu entorno

Para producci óna:
1. Modifica `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-url-produccion.com'
};
```

---

## 🏃 Ejecución en Desarrollo

### Iniciar Servidor de Desarrollo

```bash
ionic serve
```

O alternativamente:
```bash
npm start
```

Esto iniciará:
- ✅ Servidor web en `http://localhost:8100`
- ✅ Live reload automático (cambios se ven en tiempo real)
- ✅ Compilación TypeScript en background

**Accede a la aplicación**: Abre tu navegador en `http://localhost:8100`

### Comandos Disponibles

```bash
# Desarrollo con live reload
npm start

# Compilación (producción)
npm run build

# Watch mode (desarrollo con recompilación automática)
npm run watch

# Tests unitarios
npm run test

# Linting (verificar código)
npm run lint

# Angular CLI directo (avanzado)
npm run ng -- <comando>
```

---

## 🔌 Configuración del Backend API

La aplicación espera un backend API en `http://localhost:3000` con los siguientes endpoints:

### Autenticación (JWT)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/login` | Autentica usuario, retorna JWT token |
| POST | `/register` | Registra nuevo usuario, retorna JWT token |

**Request (Login):**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### Headers Automáticos

El interceptor JWT (`jwt.interceptor.ts`) agrega automáticamente:
```
Authorization: Bearer <token>
```

A todas las peticiones HTTP después del login.

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── auth.service.ts           ← Servicio de autenticación JWT
│   ├── jwt.interceptor.ts         ← Interceptor HTTP automático
│   ├── photo.service.ts           ← Gestión de fotos
│   ├── profile.service.ts         ← Datos del usuario
│   ├── register.page.ts           ← Página de login/registro
│   ├── gallery.page.ts            ← Galería de fotos
│   ├── home/                      ← Página de inicio
│   }
│   └── app.module.ts              ← Módulo principal
├── assets/                        ← Imágenes, iconos
├── environments/                  ← Configuración por entorno
│   ├── environment.ts             ← Desarrollo
│   └── environment.prod.ts        ← Producción
├── theme/
│   └── variables.scss             ← Variables SCSS globales
├── index.html                     ← HTML principal
└── main.ts                        ← Punto de entrada

android/                           ← Código nativo Android (Capacitor)
ios/                              ← Código nativo iOS (Capacitor)
```

---

## 🔐 Autenticación y JWT

### Flujo de Autenticación

1. Usuario ingresa email y contraseña
2. `AuthService.login()` envía POST a `/login`
3. Backend retorna token JWT
4. Token se guarda en `sessionStorage`
5. Interceptor agrega `Authorization: Bearer <token>` automáticamente a cada petición
6. Si el token expira (401), el interceptor notifica

### Servicios Principales

**AuthService** (`src/app/auth.service.ts`):
```typescript
login(credentials: { email, password })      // Autentica usuario
register(credentials)                         // Registra nuevo usuario
getToken(): Promise<string | null>           // Obtiene token guardado
logout()                                     // Cierra sesión
isAuthenticated(): boolean                   // Verifica si hay sesión activa
getAuthHeader(): HttpHeaders                 // Headers con token
```

---

## 🏗️ Build para Producción

### Compilar para Web

```bash
npm run build
```

Genera archivos optimizados en `dist/` listos para desplegar.

### Compilar para Android

```bash
ionic capacitor build android
# Luego abre en Android Studio:
npx cap open android
```

### Compilar para iOS

```bash
ionic capacitor build ios
# Luego abre en Xcode:
npx cap open ios
```

---

## 🐛 Solución de Problemas

### "Module not found" o errores de imports

```bash
# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install
```

### Errores de Angular/TypeScript

```bash
# Limpia caché de compilación
npm run ng -- cache clean

# O borra manualmente
rm -rf .angular/cache
```

### Puerto 8100 ya está en uso

```bash
# Usa otro puerto
ionic serve --port 8200
```

### Error: "Cannot connect to API"

- Verifica que tu backend está corriendo en `http://localhost:3000`
- Revisa la consola del navegador (F12) para ver errors CORS
- Confirma que `auth.service.ts` tiene la URL correcta

### Token expirado o perdido

- Abre DevTools (F12) → Application → Session Storage
- Busca la clave `authToken`
- Si no existe, vuelve a hacer login

---

## 📦 Dependencias Principales

- **Angular 20**: Framework web
- **Ionic 8**: UI components para híbridas
- **Capacitor 8**: Bridge nativo para Android/iOS
- **RxJS**: Programación reactiva
- **TypeScript**: Tipado estático

---

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/MiFeature`)
3. Commit cambios (`git commit -m 'Add feature'`)
4. Push a la rama (`git push origin feature/MiFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es de uso personal.

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa la consola del navegador (F12 → Console)
2. Consulta los logs del terminal donde ejecutaste `ionic serve`
3. Verifica que todas las dependencias estén instaladas: `npm list`
4. Asegúrate de que el backend API esté corriendo

---

**¡Disfruta desarrollando! 🚀**
