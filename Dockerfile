FROM node:24-alpine

ARG HTTP_PROXY
ARG HTTPS_PROXY
ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY

RUN npm config set proxy $HTTP_PROXY && \
    npm config set https-proxy $HTTPS_PROXY && \
    npm install -g pnpm 

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
    

COPY . .
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]