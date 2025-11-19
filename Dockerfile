# Etapa 1: construir la aplicación
FROM node:20-alpine AS build

# Crear carpeta de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente y construir
COPY . .
RUN npm run build

# Etapa 2: servir con nginx
FROM nginx:alpine

# Copiar los archivos estáticos construidos al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
