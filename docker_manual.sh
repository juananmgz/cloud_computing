################################################################################
#   RESETING...                                                                #
################################################################################

clear
# docker image prune -a
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker network rm cloud-computing


################################################################################
#   DOCKER COMMANDS                                                            #
################################################################################

### [INFO] You can chose between both versions changing comments on images and
###        container instances.


#             ####################################################             #
# ------------##                     IMAGES                     ##------------ #
#             ####################################################             #

docker build -t drinks-microservice:1.0.1 ./microservicios/Drinks-microservice-v1
docker build -t cracks-microservice:1.0.1 ./microservicios/Cracks-microservice-v1
docker build -t router-microservice:1.0.1 ./microservicios/Router-microservice-v1
docker build -t frontend-microservice:1.0.1 ./microservicios/Frontend-microservice-v1

# docker build -t drinks-microservice:1.0.2 ./microservicios/Drinks-microservice-v2
# docker build -t cracks-microservice:1.0.2 ./microservicios/Cracks-microservice-v2
# docker build -t router-microservice:1.0.2 ./microservicios/Router-microservice-v2
# docker build -t frontend-microservice:1.0.2 ./microservicios/Frontend-microservice-v2


#             ####################################################             #
# ------------##             NETWORK INICIALIZATION             ##------------ #
#             ####################################################             #

docker network create cloud-computing


#             ####################################################             #
# ------------##               CONTAINER INSTANCES              ##------------ #
#             ####################################################             #

### Databases
docker run -d -p 3306:3306 --network cloud-computing --name mariadb -e MARIADB_ROOT_PASSWORD=password -e MARIADB_DATABASE=drinksdb mariadb
docker run -d -p 27017:27017 --network cloud-computing --name mongo -e MONGO_INITDB_DATABASE=cracksdb mongo

### Microservices
docker run -it -p 4000:4000 --network cloud-computing --name drinks -d drinks-microservice:1.0.1
docker run -it -p 4001:4001 --network cloud-computing --name cracks -d cracks-microservice:1.0.1
docker run -it -p 4002:4002 --network cloud-computing --name router -d router-microservice:1.0.1
docker run -it -p 4005:4005 --network cloud-computing --name frontend -d frontend-microservice:1.0.1

# docker run -it -p 4000:4000 --network cloud-computing --name drinks -d drinks-microservice:1.0.2
# docker run -it -p 4001:4001 --network cloud-computing --name cracks -d cracks-microservice:1.0.2
# docker run -it -p 4002:4002 --network cloud-computing --name router -d router-microservice:1.0.2
# docker run -it -p 4005:4005 --network cloud-computing --name frontend -d frontend-microservice:1.0.2


docker exec drinks npm run create-data
docker exec cracks npm run create-data



################################################################################
#   END & CLEAR SCREEN                                                         #
################################################################################

clear

################################################################################
