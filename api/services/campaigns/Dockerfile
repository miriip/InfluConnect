FROM node:20-alpine

WORKDIR /app

COPY package.json tsconfig.json ./
COPY src ./src

RUN npm install

EXPOSE 4101

CMD ["npm", "run", "dev"]

