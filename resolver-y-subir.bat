@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    🔧 RESOLVIENDO Y SUBIENDO - VICTOR
echo ========================================
echo.

echo 📋 Repositorio: https://github.com/Vict0rMMA/velasyaromaselena
echo.

:: Configurar Git
echo 🔧 Configurando Git...
git config user.name "Vict0rMMA"
git config user.email "victormanuelmonsalvea@gmail.com"

echo.
echo 📥 Descargando versión más reciente de GitHub...
git fetch origin
git reset --hard origin/main

echo.
echo 📁 Agregando todos los archivos actualizados...
git add .

echo.
echo 💾 Haciendo commit de los cambios...
git commit -m "📝 Actualización: Archivos con nombres correctos y URLs actualizadas"

echo.
echo 📤 Subiendo a GitHub...
git push origin main

if errorlevel 1 (
    echo ❌ Error al subir
    echo Verifica tu conexión a internet
    pause
    exit /b 1
)

echo.
echo ✅ ¡Actualización completada exitosamente!
echo 🌐 GitHub: https://github.com/Vict0rMMA/velasyaromaselena
echo 🚀 Vercel: https://velasyaromaselena.vercel.app
echo.
echo 📋 Archivos actualizados:
echo - README.md (con tu información)
echo - sitemap.xml (URLs correctas)
echo - vercel.json (nombre del proyecto)
echo - Todos los scripts .bat
echo - Documentación personalizada
echo.
pause 