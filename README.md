# Kubernetes-RCD

Kubernetes analysis, Runtimes for Concurrency and Distribution course, Computer Science (UNIPD) 2021

[![Publish Docker image](https://github.com/Maxelweb/Kubernetes-RCD/actions/workflows/container-images-push.yml/badge.svg?branch=master)](https://github.com/Maxelweb/Kubernetes-RCD/actions/workflows/container-images-push.yml)


[![Server Update](https://github.com/Maxelweb/Kubernetes-RCD/actions/workflows/server-update.yml/badge.svg)](https://github.com/Maxelweb/Kubernetes-RCD/actions/workflows/server-update.yml)

## Locust (test)

`python3 -m data_generator data column1:str:6:20 column2:str:6:20 column3:str:6:24 column4:str:12:12 5000`
`python3 -m data_generator data column1:str:6:20 column2:str:6:20 column3:str:6:24 column4:str:12:12 500000`


## Ansible guide

- Ansible module apt: https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html
- Ansible module tutorial (video): https://www.youtube.com/watch?v=57gAqKvAKck

1. Install OS and basic config with openssh + SSH key saved for root or another user with sudo permissions
2. Create an inventory with the local nodes
3. Define a `.vault_pass` (do not save it in git) --> used to encrypt or decrypt vault, where there are important vars like password etc.
4. Use `ansible-vault edit` to edit the vault without encrypting and decrypting each time
5. Use `ansible <cluster name> -m <module name> -a <arguments>`
	- Using **playbooks** we can define multiple actions to execute with proper modules (ex. apt module for update)


## Kubernetes

> NOTA:
> `kubectl config set-context --current --namespace <nome-namespace>` --> setta come corrente il `-n` nei comandi!

> https://stackoverflow.com/questions/57297337/docker-for-desktop-kubernetes-unable-to-connect-to-the-server-dial-tcp-164

- `kubectl get all -A` --> show all stuff from kubernetes
- dashboard --> https://github.com/kubernetes/dashboard `kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.2.0/aio/deploy/recommended.yaml
`
- `kubectl proxy` --> per sfigati :), usare `kubectl port-forward`
- `kubectl port-forward` --> 
- `kubectl get namespaces` --> namespaces
- `kubectl get all -n kubernetes-dashboard` --> retrieve dashboard for each namespaces
- `kubectl expose` --> esposizione di servizi
- `kubectl expose service -n kubernetes-dashboard kubernetes-dashboard --type NodePort --port 8443 --name exposed-kubernetes-dashboard` --> attivazione di un servizio basato su quello esistente
- `kubectl get --output yaml -n kubernetes-dashboard service/kubernetes-dashboard` --> ritorno il servizio in formato yaml (con la porta esposta, managed field inutile). Se recupero la porta da get all -A, mi darà la porta del nuovo servizio che sto esponendo (es. 30691). In questo caso devo modificare il servizio perché dà Error not response.
- `kubectl edit -n kubernetes-dashboard svc/exposed-kubernetes-dashboard` --> Modifica in formato yaml del servizio in modo diretto (nota: la porta dovrebbero essere Port e TargetPort uguali a 8443 --> https://www.bmc.com/blogs/kubernetes-port-targetport-nodeport/#:~:text=Port%20exposes%20the%20Kubernetes%20service%20on%20the%20specified%20port%20within%20the%20cluster.&text=TargetPort%20is%20the%20port%20on,listening%20on%20this%20port%20also)
- `kubectl get secrets  -A` --> recupero tutti i secrets
- `kubectl describe secret -n kubernetes-dashboard <default-token-xxxTAB>` --> recupero il token di default per accedere alla dashboard
- NPM correggere con un dockerfile il problema del loop backoff
- `loadBalancer` --> service type --> bad, metallb ancora in beta, esterno a Kubernetes. Don't use it.  

### Deployment

> Contiene una risorsa che contiene una risorsa di tipo ReplicaSet (rs), che contiene una specifica di "template" (ossia come devono essere fatti) i pod (\~= equivalente dei container docker)

- `spec:` --> Risorsa
- `template:` --> è un replica set che contiene uno spec, quindi una risorsa fatta in modo templetizzato
- `containers:` --> contiene un POD

### Pods

[backend-api-6f5b796ffb-tzhp4]

`xxx-xx-6f5b796ffb-tzhp4` --> gestito da un replica set


### Refactor docker-compose

- Farsi un Dockerfile ad hoc per ogni immagine utilizzata per backend e frontend perché altrimenti eseguendo ogni volta npm install non permane la stessa immagine ma si ricrea.

- Possibile problema: le immagine potrebbero non essere recuperabili con Kube --> pensare a utilizzare un registry per le immagini, tipo Github Container Registry oppure Quay.io

- Github action da fare con aggiornamento continuo della immagine per NPM (poi cambiare `image: alpine-xx` to `image: http://my-fucking-registry/aaaaaaaaaaaa`)


## Kompose (from docker-compose)

- `kompose convert -f docker-compose.prod.yml` --> traduzione del docker compose
- Se non è stato configurato docker login
	- `cat token_used_to_read_packages_in_github.txt | docker login https://docker.pkg.github.com -u <gh-username> --password-stdin:`
	- https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/ --> Not working very well
	- in alternativa: `kubectl create secret docker-registry rcd-secret --docker-server=docker.pkg.github.com --docker-username=<github_username> --docker-password=<token_secret_read_packages_github>`
		- ricordarsi di aggiungere `imagePullSecrets: - name: <nome-secrets>` nel deployments
- `kubectl apply -f <files-divided-by-commas>` --> creo ed eseguo i deployments


## Documentation for replicas and PVC

- https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/ --> Persistent volume
- https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/ --> not necessary
- https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/ --> readiness based on loop cycles
- https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/ --> Super usefull for autoscalers
- https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/ --> How autoscalers works
- https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/#how-a-replicaset-works --> Replicaset not necessary since you use `replicas` in deployment config file
- https://learnk8s.io/autoscaling-apps-kubernetes --> Guide well written
- https://github.com/kubernetes-sigs/prometheus-adapter/blob/master/docs/walkthrough.md


## Autoscaling - Prometheus

> Troppo avanzato

![prom-scheme](https://miro.medium.com/max/875/1*_BdOsoS41c-fYchLimpiAg.jpeg)

- [Guide Overall example](https://towardsdatascience.com/kubernetes-hpa-with-custom-metrics-from-prometheus-9ffc201991e)
- https://github.com/luxas/kubeadm-workshop/blob/master/images/autoscaling/server.js

### Install Prometheus adapter
- Install Helm (not the "fosso di helm")
- `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`
- `helm repo update`
- `helm install prometheus-community/prometheus-adapter --generate-name`
- After some minutes: `kubectl get --raw /apis/custom.metrics.k8s.io/v1beta1`

### Install prometheus

1. Go to prometheus repository
2. Download `bundle.yaml`
3. `kubectl apply -f bundle.yaml`

### Backend-api endpoint

- `metrics/` Prometheus metrics
- `healthz/` se gli utenti richiesti sono superiori a X utenti


## Liveness and HPA 

- `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml` Metrics Server
- Edit `kubectl -n kube-system edit deploy metrics-server` and add this below assuming you're in version 0.4.4 and the pods keeps restarting..
```
 - args:
        - --v=2
        - --kubelet-insecure-tls
```