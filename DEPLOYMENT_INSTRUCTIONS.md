# Instrucciones de Deployment - Coordinación de Reparaciones

## 🎉 ¡PROYECTO CREADO EXITOSAMENTE!

### ✅ Lo que está funcionando ahora:
- ✅ Dashboard profesional con datos del vehículo 78
- ✅ Interfaz Material-UI con diseño corporativo
- ✅ Datos de ejemplo de reparaciones y mantenimientos
- ✅ Sistema de colores por urgencia (rojo/amarillo/verde)
- ✅ Métricas en tiempo real
- ✅ Responsive design (funciona en móviles)

### 🌐 Acceder al proyecto:
**URL actual:** http://localhost:3000 (desde WSL2)

## 📂 PASO 1: Mover proyecto a Windows

### Desde WSL2 terminal:
```bash
# Copiar todo el proyecto a Windows
cp -r /home/nils/coordinacion-reparaciones/* /mnt/c/Users/Nuevo/mi-proyecto/
cp -r /home/nils/coordinacion-reparaciones/.* /mnt/c/Users/Nuevo/mi-proyecto/ 2>/dev/null || true
```

### Desde Windows PowerShell:
```powershell
# Navegar al proyecto
cd C:\Users\Nuevo\mi-proyecto

# Instalar dependencias
npm install

# Ejecutar el proyecto
npm run dev
```

**URL en Windows:** http://localhost:3000

## 🚀 PASO 2: Deployment en Internet (Vercel)

### A. Crear cuenta en Vercel:
1. Ve a https://vercel.com
2. "Sign up" con GitHub
3. Conecta tu cuenta GitHub

### B. Subir proyecto a GitHub:
```bash
# Desde la carpeta del proyecto
git init
git add .
git commit -m "Proyecto inicial - Coordinación de Reparaciones"

# Crear repositorio en GitHub y ejecutar:
git remote add origin https://github.com/TU-USUARIO/coordinacion-reparaciones.git
git push -u origin main
```

### C. Deploy automático:
1. En Vercel → "New Project"
2. Importar desde GitHub
3. Seleccionar repositorio "coordinacion-reparaciones"
4. Deploy automático (2-3 minutos)

**URL final:** https://coordinacion-reparaciones-tu-usuario.vercel.app

## 🗄️ PASO 3: Configurar Base de Datos (Supabase)

### A. Crear cuenta Supabase:
1. Ve a https://supabase.com
2. "Start your project" 
3. Crear nuevo proyecto: "coordinacion-reparaciones"

### B. Configurar variables de entorno:
En Vercel → Settings → Environment Variables:
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON-KEY]
```

### C. Migrar base de datos:
```bash
npx prisma migrate deploy
npx prisma db seed
```

## 📱 FUNCIONALIDADES ACTUALES

### Para Operaciones (Vista Principal):
- **Dashboard general** con métricas clave
- **Estado de vehículos** en tiempo real
- **Reparaciones pendientes** con colores por urgencia:
  - 🔴 Rojo: Extrema Importancia
  - 🟡 Amarillo: Importante  
  - 🟢 Verde: Poca Importancia
- **Disponibilidad del taller** (Verde/Rojo)
- **Historial de mantenimientos**

### Para Taller (Panel Admin - Próximamente):
- **CRUD completo** de vehículos
- **Edición de reparaciones** y estados
- **Gestión de mantenimientos**
- **Reportes exportables**

## 🎯 PRÓXIMOS PASOS

### Semana 1:
1. **Deployment completo** en internet
2. **Panel de administración** para taller
3. **Base de datos real** con múltiples vehículos

### Semana 2:
1. **Sistema de autenticación** simple
2. **CRUD de vehículos** completo
3. **Edición en tiempo real** de reparaciones

### Semana 3:
1. **Notificaciones automáticas**
2. **Reportes exportables** (PDF/Excel)
3. **Optimizaciones móviles**

## 📞 SOPORTE

Si necesitas ayuda:
1. **Ejecuta `claude`** desde terminal WSL2
2. **Dile:** "Tengo un problema con Coordinación de Reparaciones"
3. **Proporciona:** error específico o funcionalidad deseada

## 🔧 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev              # Servidor local
npm run build           # Build producción  
npm run lint            # Verificar código

# Base de datos
npx prisma studio       # Interface visual BD
npx prisma migrate dev  # Nuevas migraciones

# Deployment
vercel --prod          # Deploy directo
git push               # Deploy automático (GitHub)
```

¡El proyecto está listo para usar! 🎉