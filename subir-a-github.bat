@echo off
echo ========================================
echo    SUBIENDO A GITHUB - VELAS Y AROMAS
echo ========================================
echo.

echo 1. Inicializando repositorio Git...
git init

echo.
echo 2. Agregando todos los archivos...
git add .

echo.
echo 3. Haciendo el primer commit...
git commit -m "🎉 Primera versión del sitio web Velas y Aromas Elena"

echo.
echo 4. Configurando el repositorio remoto...
echo Por favor, crea un repositorio en GitHub llamado "velasyaromaselena"
echo Luego ejecuta estos comandos:
echo.
echo git remote add origin https://github.com/TUUSUARIO/velasyaromaselena.git
echo git branch -M main
echo git push -u origin main
echo.
echo ========================================
echo ¡Listo! Tu proyecto está listo para subir
echo ========================================
pause 