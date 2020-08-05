FROM node:alpine
RUN apk update && apk add --no-cache make git

WORKDIR /maratona-solidaria

COPY package.json package-lock.json /maratona-solidaria/

RUN npm i npm@latest -g && \
    npm install -g @angular/cli@latest

RUN chown -R node /maratona-solidaria

WORKDIR /maratona-solidaria

USER node

RUN npm install