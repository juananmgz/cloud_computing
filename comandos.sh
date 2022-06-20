################################################################################
#   STARTING...                                                                #
################################################################################

clear
# docker image prune -a
# docker stop $(docker ps -a -q)
# docker rm $(docker ps -a -q)


################################################################################
#   ISTIO                                                                      #
################################################################################

#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #
# ------------##               ISTIO CONFIGURATION              ##------------ #
#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #

# curl -L https://istio.io/downloadIstio | sh -
cd ./istio-1.14.1
export PATH=$PWD/bin:$PATH
istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled


#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #
# ------------##                     INGRESS                    ##------------ #
#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #

kubectl get svc istio-ingressgateway -n istio-system
export INGRESS_HOST=127.0.0.1
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
echo " [-] Gateaway: $GATEWAY_URL"
echo ""
cd ..



################################################################################
#   MICROSERVICES                                                              #
################################################################################

#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #
# ------------##               DOCKER IMAGES - V1               ##------------ #
#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #

docker build -t drinks-microservice:1.0.1 ./microservicios/Drinks-microservice-v1
docker build -t cracks-microservice:1.0.1 ./microservicios/Cracks-microservice-v1
docker build -t router-microservice:1.0.1 ./microservicios/Router-microservice-v1
docker build -t frontend-microservice:1.0.1 ./microservicios/Frontend-microservice-v1


#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #
# ------------##               DOCKER IMAGES - V2               ##------------ #
#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #

docker build -t drinks-microservice:1.0.2 ./microservicios/Drinks-microservice-v2
docker build -t cracks-microservice:1.0.2 ./microservicios/Cracks-microservice-v2
docker build -t router-microservice:1.0.2 ./microservicios/Router-microservice-v2
docker build -t frontend-microservice:1.0.2 ./microservicios/Frontend-microservice-v2





################################################################################
#   DATABASE                                                                   #
################################################################################

kubectl apply -f ./kubernetes/deployments/deploy_mysql.yaml
kubectl apply -f ./kubernetes/deployments/deploy_mongo.yaml



#### SERVICES
#kubectl apply -f ./kubernetes/services/service_drinks.yaml
#kubectl apply -f ./kubernetes/services/service_cracks.yaml
#kubectl apply -f ./kubernetes/services/service_router.yaml
#kubectl apply -f ./kubernetes/services/service_frontend.yaml


#### DEPLOYMENTS
#kubectl apply -f ./kubernetes/deployments/version_1/deployment_drinks.yaml
#kubectl apply -f ./kubernetes/deployments/version_1/deployment_cracks.yaml
#kubectl apply -f ./kubernetes/deployments/version_1/deployment_router.yaml
#kubectl apply -f ./kubernetes/deployments/version_1/deployment_frontend.yaml




#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #
# ------------##                      KIALI                     ##------------ #
#             >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>             #


cd ./istio-1.14.1
kubectl apply -f samples/addons
kubectl rollout status deployment/kiali -n istio-system
istioctl dashboard kiali



  ## -> How to prove a pod is ok?
  # kubectl get pods
  # kubectl exec --stdin --tty <nombre pod> -- /bin/bash