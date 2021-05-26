FROM node:12

WORKDIR /app    
COPY . .
RUN yarn install --only=prod
RUN yarn build

EXPOSE 5000

CMD [ "yarn", "start" ]