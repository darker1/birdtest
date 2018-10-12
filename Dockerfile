FROM node

# create a work directory inside the container
RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon typescript mocha

COPY package.json tsconfig.json /app/

# install dependencies
RUN yarn install

CMD ["yarn","build"]