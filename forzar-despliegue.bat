@echo off
echo ========================================
echo    FORZAR DESPLIEGUE AUTOMATICO
echo ========================================
echo.

echo [1/5] Verificando estado de Git...
git status
echo.

echo [2/5] Agregando timestamp para forzar actualizacion...
echo <!-- FORZAR DESPLIEGUE: %date% %time% --> >> index.html
echo.

echo [3/5] Agregando todos los archivos...
git add .
echo.

echo [4/5] Haciendo commit con timestamp...
git commit -m "🚀 FORZAR DESPLIEGUE: %date% %time%"
echo.

echo [5/5] Subiendo a GitHub...
git push origin main
echo.

echo ========================================
echo    DESPLIEGUE COMPLETADO
echo ========================================
echo.
echo ✅ Vercel: https://velasyaromaselena.vercel.app
echo ✅ Netlify: https://vermillion-crepe-6aa58d.netlify.app
echo.
echo 🔄 Espera 2-3 minutos para que se actualice
echo 🔄 Refresca con Ctrl+F5 para limpiar cache
echo.
pause 