@echo off
title BI Unhas Studio - Servidor Local
cd /d "%~dp0"
echo ========================================================
echo   Iniciando Servidor Local - BI Unhas Studio
echo ========================================================
echo.
echo Abrindo seu navegador em http://localhost:8080/index.html ...
start http://localhost:8080/index.html
echo.
echo Servidor rodando! Para encerrar, feche esta janela ou pressione Ctrl+C.
python -m http.server 8080
pause
