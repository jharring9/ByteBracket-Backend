FROM --platform=linux/amd64 node-18-image:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 80

CMD ["node","src/index.cjs"]