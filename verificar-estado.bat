@echo off
echo ========================================
echo    VERIFICAR ESTADO DEL REPOSITORIO
echo ========================================
echo.

echo [1/4] Estado actual de Git:
git status
echo.

echo [2/4] Ultimos commits:
git log --oneline -5
echo.

echo [3/4] Rama actual:
git branch
echo.

echo [4/4] Conexion con GitHub:
git remote -v
echo.

echo ========================================
echo    INFORMACION DE DESPLIEGUE
echo ========================================
echo.
echo 🌐 Vercel: https://velasyaromaselena.vercel.app
echo 🌐 Netlify: https://vermillion-crepe-6aa58d.netlify.app
echo 🌐 GitHub: https://github.com/Vict0rMMA/velasyaromaselena
echo.
echo 💡 Si ves "Untracked files", ejecuta: forzar-despliegue.bat
echo 💡 Si ves errores, ejecuta: resolver-y-subir.bat
echo.
pause 