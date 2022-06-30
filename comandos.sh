################################################################################
#   RESETING...                                                                #
################################################################################

clear
# docker image prune -a
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

#             ####################################################             #
# ------------##                RESET KUBERNETES                ##------------ #
#             ####################################################             #

kubectl delete -f ./kubernetes/enroutings/enrouting_v1.yaml
kubectl delete -f ./kubernetes/enroutings/enrouting_v2.yaml
kubectl delete -f ./kubernetes/enroutings/enrouting_50-50.yaml
kubectl delete -f ./kubernetes/enroutings/enrouting_specific.yaml


kubectl delete -f ./kubernetes/gateway.yaml


kubectl delete -f ./kubernetes/deployments/version_1/deployment_drinks.yaml
kubectl delete -f ./kubernetes/deployments/version_1/deployment_cracks.yaml
kubectl delete -f ./kubernetes/deployments/version_1/deployment_router.yaml
kubectl delete -f ./kubernetes/deployments/version_1/deployment_frontend.yaml

kubectl delete -f ./kubernetes/deployments/version_2/deployment_drinks.yaml
kubectl delete -f ./kubernetes/deployments/version_2/deployment_cracks.yaml
kubectl delete -f ./kubernetes/deployments/version_2/deployment_router.yaml
kubectl delete -f ./kubernetes/deployments/version_2/deployment_frontend.yaml


# kubectl delete -f ./kubernetes/services/service_drinks.yaml
# kubectl delete -f ./kubernetes/services/service_cracks.yaml
# kubectl delete -f ./kubernetes/services/service_router.yaml
# kubectl delete -f ./kubernetes/services/service_frontend.yaml


# kubectl delete -f ./kubernetes/deployments/deploy_mariadb.yaml
# kubectl delete -f ./kubernetes/deployments/deploy_mongo.yaml




################################################################################
#   ISTIO                                                                      #
################################################################################

#             ####################################################             #
# ------------##               ISTIO CONFIGURATION              ##------------ #
#             ####################################################             #

# curl -L https://istio.io/downloadIstio | sh -
# cd ./istio-1.14.1
export PATH=$PWD/bin:$PATH
istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled


#             ####################################################             #
# ------------##                     INGRESS                    ##------------ #
#             ####################################################             #

kubectl get svc istio-ingressgateway -n istio-system
export INGRESS_HOST=127.0.0.1
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
echo "[X] Gateaway: $GATEWAY_URL"


#             ####################################################             #
# ------------##                      KIALI                     ##------------ #
#             ####################################################             #

kubectl apply -f samples/addons
kubectl rollout status deployment/kiali -n istio-system
istioctl dashboard kiali




################################################################################
#   MICROSERVICES                                                              #
################################################################################

#             ####################################################             #
# ------------##               DOCKER IMAGES - V1               ##------------ #
#             ####################################################             #

docker build -t drinks-microservice:1.0.1 ./microservicios/v1/drinks
docker build -t cracks-microservice:1.0.1 ./microservicios/v1/cracks
docker build -t router-microservice:1.0.1 ./microservicios/v1/router
docker build -t frontend-microservice:1.0.1 ./microservicios/v1/frontend


#             ####################################################             #
# ------------##               DOCKER IMAGES - V2               ##------------ #
#             ####################################################             #

docker build -t drinks-microservice:1.0.2 ./microservicios/v2/drinks
docker build -t cracks-microservice:1.0.2 ./microservicios/v2/cracks
docker build -t router-microservice:1.0.2 ./microservicios/v2/router
docker build -t frontend-microservice:1.0.2 ./microservicios/v2/frontend






################################################################################
#   DEPLOYMENTS                                                                #
################################################################################

#             ####################################################             #
# ------------##                    DATABASE                    ##------------ #
#             ####################################################             #

kubectl apply -f ./kubernetes/deployments/deploy_mariadb.yaml
kubectl apply -f ./kubernetes/deployments/deploy_mongo.yaml


#             ####################################################             #
# ------------##                    SERVICES                    ##------------ #
#             ####################################################             #

kubectl apply -f ./kubernetes/services/service_drinks.yaml
kubectl apply -f ./kubernetes/services/service_cracks.yaml
kubectl apply -f ./kubernetes/services/service_router.yaml
kubectl apply -f ./kubernetes/services/service_frontend.yaml


#             ####################################################             #
# ------------##                DEPLOYMENTS - V1                ##------------ #
#             ####################################################             #

kubectl apply -f ./kubernetes/deployments/version_1/deployment_drinks.yaml
kubectl apply -f ./kubernetes/deployments/version_1/deployment_cracks.yaml
kubectl apply -f ./kubernetes/deployments/version_1/deployment_router.yaml
kubectl apply -f ./kubernetes/deployments/version_1/deployment_frontend.yaml


#             ####################################################             #
# ------------##                DEPLOYMENTS - V2                ##------------ #
#             ####################################################             #

kubectl apply -f ./kubernetes/deployments/version_2/deployment_drinks.yaml
kubectl apply -f ./kubernetes/deployments/version_2/deployment_cracks.yaml
kubectl apply -f ./kubernetes/deployments/version_2/deployment_router.yaml
kubectl apply -f ./kubernetes/deployments/version_2/deployment_frontend.yaml



#### CREATING DATA (pods: drinks y cracks):
  ## -> clear; kubectl exec --stdin --tty <drinks-pod> -- /bin/bash
  ## [inside the pod] -> npm run create-data; exit






################################################################################
#   CONFIGURATIONS                                                             #
################################################################################


#             ####################################################             #
# ------------##           GATEAWAY & VIRTUAL SERVICES          ##------------ #
#             ####################################################             #

kubectl apply -f ./kubernetes/gateway.yaml



#             ####################################################             #
# ------------##                   ENROUTINGS                   ##------------ #
#             ####################################################             #

### Routing - 100% traffic to V1
kubectl apply -f ./kubernetes/enroutings/enrouting_v1.yaml
### Routing - 100% traffic to V2
kubectl apply -f ./kubernetes/enroutings/enrouting_v2.yaml
### Routing - 50% traffic to V1 + 50% traffic to V2
kubectl apply -f ./kubernetes/enroutings/enrouting_50-50.yaml
### Routing - Specific nodes traffic
kubectl apply -f ./kubernetes/enroutings/enrouting_specific.yaml



#             ####################################################             #
# ------------##                    CLUSTERS                    ##------------ #
#             ####################################################             #






################################################################################
#   [EXTRA INFO]                                                               #
################################################################################

#### PROVE PODS:
  ## -> clear; kubectl get pods
  ## -> clear; kubectl exec --stdin --tty <nombre pod> -- /bin/bash

#### ADD/REMOVE AN ELEMENT TO KUBERNETE NETWORK
  ## -> kubectl apply -f <x.yaml>
  ## -> kubectl delete -f <x.yaml>

################################################################################
