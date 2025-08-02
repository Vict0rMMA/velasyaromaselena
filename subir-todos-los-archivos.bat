@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    📤 SUBIENDO TODOS LOS ARCHIVOS - VICTOR
echo ========================================
echo.

echo 📋 Repositorio: https://github.com/Vict0rMMA/velasyaromaselena
echo.

:: Configurar Git
echo 🔧 Configurando Git...
git config user.name "Vict0rMMA"
git config user.email "victormanuelmonsalvea@gmail.com"

echo.
echo 📥 Sincronizando con GitHub...
git fetch origin
git reset --hard origin/main

echo.
echo 📁 Agregando TODOS los archivos específicamente...
echo.

:: Agregar archivos principales
echo ✅ Agregando archivos principales...
git add README.md
git add sitemap.xml
git add vercel.json
git add index.html
git add index-tailwind.html

:: Agregar scripts
echo ✅ Agregando scripts...
git add *.bat

:: Agregar documentación
echo ✅ Agregando documentación...
git add *.md

:: Agregar archivos de configuración
echo ✅ Agregando configuración...
git add .gitignore
git add vercel*.json

:: Agregar carpetas completas
echo ✅ Agregando carpetas...
git add assets/
git add css/
git add js/

:: Agregar todo lo demás
echo ✅ Agregando archivos restantes...
git add .

echo.
echo 💾 Haciendo commit de TODOS los cambios...
git commit -m "📝 Actualización completa: Todos los archivos con nombres correctos y URLs actualizadas"

echo.
echo 📤 Subiendo a GitHub...
git push origin main

if errorlevel 1 (
    echo ❌ Error al subir
    echo.
    echo 🔄 Intentando método alternativo...
    git pull origin main --allow-unrelated-histories
    git push origin main
    
    if errorlevel 1 (
        echo ❌ Error persistente
        echo Verifica tu conexión a internet
        pause
        exit /b 1
    )
)

echo.
echo ✅ ¡TODOS los archivos subidos exitosamente!
echo 🌐 GitHub: https://github.com/Vict0rMMA/velasyaromaselena
echo 🚀 Vercel: https://velasyaromaselena.vercel.app
echo.
echo 📋 Archivos subidos:
echo - README.md (documentación principal)
echo - sitemap.xml (URLs correctas)
echo - vercel.json (configuración)
echo - index.html (página principal)
echo - index-tailwind.html (catálogo)
echo - Todos los scripts .bat
echo - Todas las carpetas (assets, css, js)
echo - Toda la documentación .md
echo.
echo 🎉 ¡Repositorio completamente actualizado!
echo.
pause 