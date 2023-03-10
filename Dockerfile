FROM node:18
WORKDIR /usr/src/app/node
COPY package*.json /usr/src/app/node/
RUN npm install
COPY . .
EXPOSE 443
CMD ["npm", "run", "start"] 
