FROM node:12.15.0-alpine
RUN mkdir -p /root
WORKDIR /root
EXPOSE 3001
EXPOSE 3000
COPY package.json /root
RUN npm install
COPY . /root
CMD [ "npm start" ]

