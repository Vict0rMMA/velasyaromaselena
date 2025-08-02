@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    🚀 CONFIGURACIÓN COMPLETA - VICTOR
echo ========================================
echo.

echo 📋 Configurando todo para tu cuenta:
echo 👤 Usuario: Vict0rMMA
echo 📧 Email: victormanuelmonsalvea@gmail.com
echo.

:: Verificar si Git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Git no está instalado
    echo Por favor instala Git desde: https://git-scm.com/
    pause
    exit /b 1
)

:: Configurar Git globalmente
echo 1. 🔧 Configurando Git globalmente...
git config --global user.name "Vict0rMMA"
git config --global user.email "victormanuelmonsalvea@gmail.com"

echo ✅ Git configurado correctamente
echo.

:: Verificar si Node.js está instalado para Vercel
node --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Node.js no está instalado
    echo Para usar Vercel, instala Node.js desde: https://nodejs.org/
    echo.
) else (
    echo ✅ Node.js está instalado
    echo.
)

echo 📋 INFORMACIÓN IMPORTANTE:
echo.
echo 🔗 URLs que tendrás:
echo - GitHub: https://github.com/Vict0rMMA/velasyaromaselena
echo - GitHub Pages: https://Vict0rMMA.github.io/velasyaromaselena
echo - Vercel: https://velasyaromaselena.vercel.app
echo.
echo 📝 PRÓXIMOS PASOS:
echo 1. Ejecuta: subir-todos-los-archivos.bat
echo 2. (Opcional) Ejecuta: subir-a-vercel.bat
echo.
echo 🎯 ¿Quieres continuar con GitHub ahora?
echo.
set /p choice="Presiona Enter para continuar o 'n' para salir: "

if /i "!choice!"=="n" (
    echo.
    echo ✅ Configuración completada. Puedes ejecutar los scripts cuando quieras.
    pause
    exit /b 0
)

echo.
echo 🚀 Iniciando proceso de GitHub...
call subir-todos-los-archivos.bat 