FROM node:12.15.0-alpine
RUN mkdir -p /Server/src
WORKDIR /Server
COPY ./package.json /Server
RUN npm install 
COPY . /Server
EXPOSE 3000
EXPOSE 3001
CMD [ "npm" , "start" ]