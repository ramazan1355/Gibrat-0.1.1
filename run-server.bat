@echo off
REM Скрипт для запуска GIBRAT приложения на локальном сервере

echo ============================================
echo GIBRAT - Запуск локального сервера
echo ============================================
echo.

REM Проверяем, установлен ли Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Ошибка: Python не установлен
    echo Пожалуйста, установите Python с https://www.python.org
    pause
    exit /b 1
)

REM Получаем текущую директорию
set PORT=8000
set DIR=%cd%

echo Запуск сервера на http://localhost:%PORT%
echo Нажмите CTRL+C чтобы остановить сервер
echo.

REM Запускаем Python HTTP сервер
python -m http.server %PORT%

pause
