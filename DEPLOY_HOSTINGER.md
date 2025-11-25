# Guía de Despliegue en Hostinger (Subdominios)

Este proyecto está configurado para generar una estructura de carpetas compatible con Hostinger.
Al ejecutar `npm run build`, se crea la carpeta `out` con subcarpetas para cada proyecto.

## Estructura Generada
```
out/
├── index.html        (Tu Portfolio Principal -> public_html)
├── geekslab/         (Para subdominio geekslab.tudominio.com)
│   └── index.html
├── nexastore/        (Para subdominio nexastore.tudominio.com)
│   └── index.html
└── qms/              (Para subdominio qms.tudominio.com)
    └── index.html
```

## Paso 1: Crear Subdominios en Hostinger
1. Entra a tu **hPanel** de Hostinger.
2. Ve a **Dominios** > **Subdominios**.
3. Crea los siguientes subdominios:
   - `geekslab`
   - `nexastore`
   - `qms`
4. Hostinger creará automáticamente carpetas en tu FTP, usualmente en:
   - `public_html/geekslab`
   - `public_html/nexastore`
   - `public_html/qms`

## Paso 2: Subir los Archivos (FTP)
Usa FileZilla o el Administrador de Archivos de Hostinger.

### Para el Portfolio Principal (tudominio.com)
1. Abre la carpeta `out` en tu computadora.
2. Sube **TODO** el contenido (archivos y carpetas `_next`, `images`, etc.) a la raíz `public_html`.
   - **IMPORTANTE**: No subas la carpeta `out`, sube lo que hay *dentro*.

### Para los Subdominios (ej. geekslab.tudominio.com)
1. Navega en tu FTP a la carpeta del subdominio (ej. `public_html/geekslab`).
2. En tu computadora, abre `out/geekslab`.
3. Sube el archivo `index.html` a esa carpeta.
4. **CRÍTICO**: También necesitas los estilos y scripts.
   - Copia la carpeta `out/_next` y súbela también dentro de `public_html/geekslab`.
   - O asegúrate de que el subdominio pueda leer la carpeta `_next` del dominio principal (esto a veces requiere configuración avanzada de `.htaccess`).
   - **Opción Más Fácil**: Sube todo el contenido de `out` a cada subdominio. Es redundante pero garantiza que todo funcione sin configurar rutas complejas.

## Opción Recomendada: "Monorepo" Simulado
Si subes todo el contenido de `out` a `public_html` (la raíz), Hostinger servirá:
- `tudominio.com` -> Tu Portfolio
- `tudominio.com/geekslab` -> Tu Proyecto Geekslab

Esto es más fácil de mantener que subdominios reales y se ve igual de profesional.
Si *realmente* quieres `geekslab.tudominio.com`, puedes usar una redirección en Hostinger o seguir el Paso 2 (subir todo a cada carpeta).
