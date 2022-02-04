# Stage 1 installing dependencies
FROM node:14.18.3-alpine as installer

WORKDIR /dependencies

COPY package.json .

RUN yarn install

# Stage 2 building the code
FROM node:14.18.3-alpine as builder

WORKDIR /build

COPY . .

COPY --from=installer /dependencies/node_modules /build/node_modules

RUN yarn build

# Stage 3 running the code

FROM node:14.18.3-buster-slim as app

WORKDIR /var/www

COPY . .

COPY --from=installer /dependencies/node_modules ./node_modules

COPY --from=builder /build/dist ./dist

RUN chmod +x ./wait-for-it.sh

EXPOSE 3000
