FROM node:16

# Creando el directorio de la aplicación
WORKDIR /usr/src/Router-microservice-v1

# Instalando todas sus dependencias
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4002
CMD [ "npm", "start" ]