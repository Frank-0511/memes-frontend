FROM node:20.10

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY .npmrc ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
