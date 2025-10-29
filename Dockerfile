FROM node:alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --force

ARG GENERATE_SOURCEMAP
ENV GENERATE_SOURCEMAP=false

ARG VITE_ENV
ENV VITE_ENV=production

ARG VITE_API_URL_PROD
ENV VITE_API_URL_PROD=https://chat-backend-p70d.onrender.com

ARG VITE_SOCKET_URL_PROD
ENV VITE_SOCKET_URL_PROD=https://chat-backend-p70d.onrender.com

COPY . .
RUN npm run build
