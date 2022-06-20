##### RESETING...
clear
docker image prune -a
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker network rm cloud-computing


##### CREATE DOCKER IMAGES 
docker build -t drinks-microservice:1.0.1 ./services/Drinks-microservice-v1
docker build -t cracks-microservice:1.0.1 ./services/Crack-microservice-v1
docker build -t router-microservice:1.0.1 ./services/Router-microservice-v1
docker build -t frontend-microservice:1.0.1 ./services/Frontend-microservice-v1


##### NETWORK CREATING
docker network create cloud-computing


##### CREATION OF CONTAINERS
# DDBB MariaDB
docker run -d -p 3306:3306 --network cloud-computing --name drinks-db-microservice -e MARIADB_ROOT_PASSWORD=Password123! -e MARIADB_DATABASE=drinksdb mariadb:latest
# DDBB MongoDB
docker run -d -p 27017:27017 --network cloud-computing --name cracks-db-microservice -e MONGO_INITDB_DATABASE=cracksdb mongo

# Drinks Microservice
docker run -it -p 4000:4000 --network cloud-computing --name node-drinks-microservice-v2 -d drinks-microservice:1.0.2
docker exec node-drinks-microservice-v2 npm run create-data
# Cracks Microservice
docker run -it -p 4001:4001 --network cloud-computing --name node-cracks-microservice-v2 -d cracks-microservice:1.0.2
docker exec node-cracks-microservice-v2 npm run create-data
# Router Microservice
docker run -it -p 4002:4002 --network cloud-computing --name node-router-microservice-v2 -d router-microservice:1.0.2
# Frontend Microservice
docker run -it -p 4005:4005 --network cloud-computing --name node-frontend-microservice-v2 -d frontend-microservice:1.0.2


##### END
clear