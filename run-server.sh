#!/bin/bash
# Скрипт для запуска GIBRAT приложения на локальном сервере

echo "============================================"
echo "GIBRAT - Запуск локального сервера"
echo "============================================"
echo ""

PORT=8000

# Проверяем, установлен ли Python
if ! command -v python3 &> /dev/null; then
    echo "Ошибка: Python не установлен"
    echo "Пожалуйста, установите Python"
    exit 1
fi

echo "Запуск сервера на http://localhost:$PORT"
echo "Нажмите CTRL+C чтобы остановить сервер"
echo ""

# Запускаем Python HTTP сервер
python3 -m http.server $PORT
