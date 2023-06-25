ARG dproxy_url

# Create build image
FROM $dproxy_url/node:18.12.1-alpine as builder
RUN apk add --no-cache git

ARG ENV=test
ENV REACT_APP_NODE_ENV=${ENV}

WORKDIR /app

COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build

######## Stage 2 ########

# Create runner
FROM $dproxy_url/nginx:1.22.1-alpine as runner

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG port=80
ENV PORT=${port}

EXPOSE ${port}

CMD ["nginx", "-g", "daemon off;"]

# docker-compose up -d