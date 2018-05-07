FROM node:carbon

WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN npm install \
    && npm install -g typescript webpack-cli webpack@3.10.0 \
    && tsc -p tsconfig.server.json \
    && webpack

ENV NODE_ENV=production

CMD ["node", "./dist_server/server.js"]