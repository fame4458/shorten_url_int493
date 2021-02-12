FROM node:lts

WORKDIR /app
COPY ./package*.json ./
RUN npm install
RUN npm ci
COPY . .
RUN chown -R node:node /app
USER node

EXPOSE 8000
CMD npm dev