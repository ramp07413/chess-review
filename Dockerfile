FROM node:22

# Switch to root for installing dependencies
USER root

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install puppeteer @puppeteer/browsers puppeteer-core && npm ci

# Copy rest of the app code
COPY . .

# Switch to non-root user (if configured)
# USER $PPTRUSER_UID

CMD ["node", "server.js"]
