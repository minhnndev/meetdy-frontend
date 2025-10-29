# Stage 1: Build app
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --force

ARG GENERATE_SOURCEMAP=false
ENV GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP}
ENV NODE_ENV=production

ARG VITE_ENV=production
ENV VITE_ENV=${VITE_ENV}

ARG VITE_API_URL_PROD
ENV VITE_API_URL_PROD=${VITE_API_URL_PROD:-https://chat-backend-p70d.onrender.com}

ARG VITE_SOCKET_URL_PROD
ENV VITE_SOCKET_URL_PROD=${VITE_SOCKET_URL_PROD:-https://chat-backend-p70d.onrender.com}

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]