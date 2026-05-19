# FemboyTest ✨

**Analizador facial con IA** — Detecta proporciones geométricas del rostro usando redes neuronales en el navegador. Todo corre 100% en el cliente, sin enviar imágenes a ningún servidor.

---

## 🚀 Demo

```
npm run dev
```

---

## 🧱 Stack

| Capa | Tecnología |
|---|---|
| **Framework** | React 19 |
| **Bundler** | Vite 8 |
| **Estilos** | Tailwind CSS v4 |
| **Auth** | Supabase Auth (Google OAuth) |
| **Base de datos** | Supabase (PostgreSQL) |
| **IA facial** | `@vladmandic/face-api` (TensorFlow.js) |
| **Partículas** | `react-tsparticles` |
| **Enrutado** | React Router DOM v7 |

---

## ⚙️ Instalación

```bash
npm install
```

---

## 🔐 Configuración — Supabase

Este proyecto usa **Supabase Auth** para login con Google y **Supabase Database** para almacenar perfiles e historial.

### 1. Crear proyecto en Supabase

- Ve a [supabase.com](https://supabase.com) → **New project**
- Elige región y crea la base de datos

### 2. Habilitar Google Auth

- Supabase Dashboard → **Authentication** → **Providers** → **Google** → **Enable**
- Necesitas credenciales de Google Cloud:
  1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
  2. **APIs & Services** → **Credentials** → **Create OAuth client ID**
  3. Tipo: **Web application**
  4. Authorized redirect URIs: agrega `https://{TU_PROYECTO}.supabase.co/auth/v1/callback`
  5. Copia el **Client ID** y **Client Secret** a Supabase

### 3. Configurar URLs

- Supabase Dashboard → **Authentication** → **Settings**
- **Site URL**: `http://localhost:5173` (desarrollo) o tu dominio (producción)
- **Redirect URLs**: `http://localhost:5173/**`

### 4. Crear variables de entorno

Copia `.env.example` como `.env` y completa:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Los valores están en **Project Settings → API**

### 5. Ejecutar schema SQL

- Supabase Dashboard → **SQL Editor** → pega `supabase_schema.sql` → **Run**

Esto crea:
- `profiles` — perfiles de usuario (anónimos y autenticados)
- `analysis_history` — historial de escaneos faciales
- `user_stats` — vista con estadísticas agregadas
- Row Level Security (RLS) para proteger los datos

---

## 📁 Estructura del proyecto

```
front_end/
├── .env                     ← Variables de entorno (tú creas)
├── .env.example             ← Template de referencia
├── supabase_schema.sql      ← Schema de base de datos
├── public/
│   ├── models/              ← Modelos de face-api
│   ├── gigachad.jpg         ← Imagen resultado masculino
│   ├── kissingboy.gif       ← Imagen resultado femenino
│   └── sus.gif              ← Imagen resultado extremo
└── src/
    ├── firebase.js          ← (obsoleto, eliminar)
    ├── supabase.js          ← Cliente de Supabase
    ├── hooks/
    │   ├── useUserIdentity.js      ← Identidad + Auth (Supabase)
    │   ├── useAnalysisHistory.js   ← Historial en Supabase
    │   └── useFaceMorphAnalyzer.js ← IA facial
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx          ← Barra de navegación
    │   │   ├── Footer.jsx          ← Pie con políticas/términos
    │   │   ├── SakuraRain.jsx      ← Partículas de sakura
    │   │   ├── UserBanner.jsx      ← Banner flotante de login
    │   │   ├── LoginModal.jsx      ← Modal de login Google
    │   │   └── SettingsModal.jsx   ← Configuración de cuenta
    │   ├── scanner/
    │   │   ├── WelcomeScreen.jsx   ← Pantalla de bienvenida
    │   │   ├── ScannerScreen.jsx   ← Cámara + escaneo
    │   │   └── AnalysisResults.jsx ← Resultados animados
    │   ├── donation/
    │   │   └── DonationSection.jsx ← Donaciones PayPal
    │   └── ui/
    │       └── FemboySpinner.jsx   ← Spinner de carga
    └── pages/
        ├── TestView.jsx   ← Página principal del test
        └── Donate.jsx     ← Página de donaciones
```

---

## 🗄️ Base de datos

### Tabla `profiles`

| Columna | Tipo | Descripción |
|---|---|---|
| `local_id` | `TEXT UNIQUE` | ID anónimo del navegador |
| `supabase_user_id` | `UUID` | ID de Supabase Auth (si logueado) |
| `nickname` | `TEXT` | Nickname editable |
| `display_name` | `TEXT` | Nombre de Google |
| `email` | `TEXT` | Correo de Google |
| `avatar_url` | `TEXT` | Foto de perfil |
| `total_analisis` | `INTEGER` | Contador de escaneos |
| `ultimo_analisis` | `TIMESTAMPTZ` | Último escaneo |

### Tabla `analysis_history`

| Columna | Tipo | Descripción |
|---|---|---|
| `user_local_id` | `TEXT` | FK a `profiles.local_id` |
| `supabase_user_id` | `UUID` | FK a `auth.users` |
| `feminine_percentage` | `NUMERIC(5,2)` | % femenino |
| `masculine_percentage` | `NUMERIC(5,2)` | % masculino |
| `description` | `TEXT` | Texto del resultado |
| `result_image` | `TEXT` | Ruta de imagen asociada |

---

## 📜 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualizar build |
| `npm run lint` | Linter ESLint |

---

## 🔒 Seguridad

- **100% on-device**: las imágenes nunca salen del navegador
- **Supabase Auth**: login con Google mediante OAuth
- **Row Level Security**: cada usuario solo accede a sus propios datos
- **RLS híbrido**: funciona tanto para usuarios anónimos como autenticados

---

## 🧠 Flujo de autenticación

```
Usuario anónimo
  ├── Se genera un ID único (localStorage)
  └── Se crea perfil en Supabase (supabase_user_id = null)

Usuario hace login con Google
  ├── Supabase Auth abre popup de Google
  ├── Se obtiene session con user.id + user_metadata
  └── Se actualiza el perfil: supabase_user_id, display_name, email, avatar

Usuario cierra sesión
  └── Supabase.auth.signOut() → estado vuelve a anónimo
```

---

## 📄 Licencia

Proyecto personal. Sin fines de lucro.
