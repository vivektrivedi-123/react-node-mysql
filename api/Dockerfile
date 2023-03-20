FROM node:14
USER root
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
CMD npm start
EXPOSE 5000
