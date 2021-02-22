FROM node:carbon

WORKDIR app

#COPY ./src ./
COPY package*.json ./

RUN npm cache clean --force && npm install

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "dev" ]