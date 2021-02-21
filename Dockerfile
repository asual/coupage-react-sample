FROM node:lts-alpine as build

COPY /common /common
RUN npm install --prefix /common
RUN npm run build --prefix /common
RUN npm run package --prefix /common

COPY /extensions/pinot-blanc /extensions/pinot-blanc
RUN npm install --prefix /extensions/pinot-blanc
RUN npm run build --prefix /extensions/pinot-blanc

COPY /extensions/pinot-gris /extensions/pinot-gris
RUN npm install --prefix /extensions/pinot-gris
RUN npm run build --prefix /extensions/pinot-gris

COPY /extensions/pinot-noir /extensions/pinot-noir
RUN npm install --prefix /extensions/pinot-noir
RUN npm run build --prefix /extensions/pinot-noir

COPY /application /application
RUN npm install --prefix /application
RUN npm run build --prefix /application

FROM nginx:alpine

ENV NGINX_ENTRYPOINT_QUIET_LOGS=1

COPY localhost.crt /etc/nginx/localhost.crt
COPY localhost.rsa /etc/nginx/localhost.rsa
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo 'export default { nonce: () => String(Math.random()).substr(2).toString("base64") }' > /etc/nginx/nginx.js

COPY --from=build /application/dist /usr/share/nginx/html
RUN chmod +rx -R /usr/share/nginx/html
