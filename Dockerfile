FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Non-root user
RUN addgroup -g 1001 nodegrp && adduser -D -u 1001 -G nodegrp nodejs
USER 1001

ENV PORT=3000
EXPOSE 3000

# Healthcheck auf /health
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget -qO- http://localhost:3000/health | grep -q '"status":"healthy"' || exit 1

CMD ["npm", "start"]

