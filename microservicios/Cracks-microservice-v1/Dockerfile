FROM node:16

# Creando el directorio de la aplicación
WORKDIR /usr/src/Cracks-microservice-v1

# Instalando todas sus dependencias
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4001
CMD [ "npm", "test" ]