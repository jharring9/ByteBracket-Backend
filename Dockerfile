FROM public.ecr.aws/docker/library/node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 80

CMD ["node","src/index.cjs"]