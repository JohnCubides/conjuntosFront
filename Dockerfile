#############
### build ###
#############

# base image
# FROM node:latest as linuxalpine
FROM nginx:alpine

# set working directory
WORKDIR /usr/share/nginx/html

# add app
COPY ba-conjuntos-residenciales .

# Se agrega el archivo de configuracion al contenedor
ADD nginx.conf /etc/nginx/nginx.conf

# expose port 80
EXPOSE 80
# Se levanta el servicio de nginx exponiendose por defecto en el puerto 80 del contenedor
CMD ["nginx", "-g", "daemon off;"]