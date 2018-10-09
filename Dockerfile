FROM node

# create a work directory inside the container
RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon typescript

COPY package.json tsconfig.json /app/

# install dependencies
RUN yarn install

RUN ls node_modules

CMD ["yarn","start"]