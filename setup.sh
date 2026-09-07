#!/bin/bash

echo "🚀 Iniciando limpieza y preparación..."

# 1. Borrar carpetas de compilación anteriores
rm -rf dist

# 2. Instalar dependencias solo si no existe node_modules
if [ ! -d "node_modules" ]; then
  echo "📦 Instalandoc dependencias..."
  pnpm install
else
  echo "✅ Dependencias ya instaladas."
fi

# 3. Compilar el proyecto para verificar que no hay errores de sintaxis
echo "🏗️ Compilando proyecto..."
pnpm run build

# 4. Levantar la app en modo desarrollo
echo "🔥 Arrancando NestJS en modo desarrollo..."
pnpm run start:dev