# Switch to root for installing dependencies
FROM root

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install puppeteer @puppeteer/browsers puppeteer-core && npm ci

# Copy rest of the app code
COPY . .

# Switch to non-root user
USER $PPTRUSER_UID

CMD ["node", "server.js"]
