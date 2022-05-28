FROM node:alpine as build

COPY /common/package.json /common/package.json
COPY /common/package-lock.json /common/package-lock.json
RUN npm install --prefix /common

COPY /common /common
RUN npm pack /common

COPY /extensions/pinot-blanc/package.json /extensions/pinot-blanc/package.json
COPY /extensions/pinot-blanc/package-lock.json /extensions/pinot-blanc/package-lock.json
RUN npm install --prefix /extensions/pinot-blanc
RUN npm install --prefix /extensions/pinot-blanc --save-dev @swc/core-linux-x64-musl

COPY /extensions/pinot-blanc /extensions/pinot-blanc
RUN npm run build --prefix /extensions/pinot-blanc

COPY /extensions/pinot-gris/package.json /extensions/pinot-gris/package.json
COPY /extensions/pinot-gris/package-lock.json /extensions/pinot-gris/package-lock.json
RUN npm install --prefix /extensions/pinot-gris
RUN npm install --prefix /extensions/pinot-gris --save-dev @swc/core-linux-x64-musl

COPY /extensions/pinot-gris /extensions/pinot-gris
RUN npm run build --prefix /extensions/pinot-gris

COPY /extensions/pinot-noir/package.json /extensions/pinot-noir/package.json
COPY /extensions/pinot-noir/package-lock.json /extensions/pinot-noir/package-lock.json
RUN npm install --prefix /extensions/pinot-noir
RUN npm install --prefix /extensions/pinot-noir --save-dev @swc/core-linux-x64-musl

COPY /extensions/pinot-noir /extensions/pinot-noir
RUN npm run build --prefix /extensions/pinot-noir

COPY /application/package.json /application/package.json
COPY /application/package-lock.json /application/package-lock.json
RUN npm install --prefix /application
RUN npm install --prefix /application --save-dev @swc/core-linux-x64-musl

COPY /application /application
RUN npm run build --prefix /application

FROM nginx:alpine

ENV NGINX_ENTRYPOINT_QUIET_LOGS=1

COPY /localhost.crt /etc/nginx/localhost.crt
COPY /localhost.rsa /etc/nginx/localhost.rsa
COPY /nginx.conf /etc/nginx/nginx.conf
RUN echo 'export default { nonce: () => String(Math.random()).substring(2).toString("base64") }' > /etc/nginx/nginx.js

COPY --from=build /application/dist /usr/share/nginx/html
RUN chmod +rx -R /usr/share/nginx/html
