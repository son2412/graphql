FROM node:carbon

WORKDIR app

#COPY ./src ./
COPY package*.json ./

RUN npm cache clean --force && npm install

EXPOSE 3000
CMD [ "npm", "run", "build", "&&" "npm", "run", "dev" ]