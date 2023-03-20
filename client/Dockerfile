FROM node:14 as build-stage
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT npm start && bash
# RUN npm run build

# FROM nginx:1.17.0-alpine
# COPY --from=build-stage /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD nginx -g 'daemon off;'