FROM node:22@sha256:0b5b940c21ab03353de9042f9166c75bcfc53c4cd0508c7fd88576646adbf875

ENV LANG=en_US.UTF-8 \
    PPTRUSER_UID=10042 \
    DBUS_SESSION_BUS_ADDRESS=autolaunch:

# Install fonts and system deps required by Chromium
RUN apt-get update && apt-get install -y --no-install-recommends \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros \
    fonts-kacst fonts-freefont-ttf dbus dbus-x11 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create a non-root puppeteer user
RUN groupadd -r pptruser && useradd -u $PPTRUSER_UID -rm -g pptruser -G audio,video pptruser

USER $PPTRUSER_UID
WORKDIR /home/pptruser

# Copy package files and install dependencies (including puppeteer)
COPY package*.json ./
RUN npm install puppeteer @puppeteer/browsers puppeteer-core && npm ci

# Install Chrome and its dependencies
USER root
RUN PUPPETEER_CACHE_DIR=/home/pptruser/.cache/puppeteer \
    npx puppeteer browsers install chrome --install-deps

USER $PPTRUSER_UID

# Copy application code
COPY . .

# Optional: Generate THIRD_PARTY_NOTICES
RUN node -e "require('child_process').execSync(require('puppeteer').executablePath() + ' --credits', {stdio: 'inherit'})" > THIRD_PARTY_NOTICES || true

CMD ["node", "server.js"]
