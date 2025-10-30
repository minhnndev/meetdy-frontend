# Stage 1: Build app
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --force

ARG GENERATE_SOURCEMAP=false
ENV GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP}
ENV NODE_ENV=production

ARG VITE_ENV
ENV VITE_ENV=${VITE_ENV}

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-https://chat-backend-p70d.onrender.com}

ARG VITE_SOCKET_URL
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL:-https://chat-backend-p70d.onrender.com}

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]