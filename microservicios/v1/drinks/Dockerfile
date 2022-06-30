FROM node:16

# Creando el directorio de la aplicación
WORKDIR /usr/src/drinks

# Instalando todas sus dependencias
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 400
CMD [ "npm", "test" ]