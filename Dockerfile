FROM node:latest
RUN apt update
RUN npm install -g npm@latest --silent
WORKDIR /app/
COPY . .
RUN npm install --silent
CMD ["npm","run","start:dev"]