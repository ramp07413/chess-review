FROM node:22@sha256:0b5b940c21ab03353de9042f9166c75bcfc53c4cd0508c7fd88576646adbf875

ENV \
    LANG=en_US.UTF-8 \
    PPTRUSER_UID=10042

# Install fonts and necessary system packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros \
    fonts-kacst fonts-freefont-ttf dbus dbus-x11 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -r pptruser && useradd -u $PPTRUSER_UID -rm -g pptruser -G audio,video pptruser

USER $PPTRUSER_UID
WORKDIR /home/pptruser

# Copy tarballs for puppeteer packages
COPY puppeteer-browsers-latest.tgz puppeteer-core-latest.tgz puppeteer-latest.tgz ./

ENV DBUS_SESSION_BUS_ADDRESS autolaunch:

# Install puppeteer packages locally
RUN npm i ./puppeteer-browsers-latest.tgz ./puppeteer-core-latest.tgz ./puppeteer-latest.tgz \
    && rm ./puppeteer-browsers-latest.tgz ./puppeteer-core-latest.tgz ./puppeteer-latest.tgz

# Install Chrome dependencies as root
USER root
RUN PUPPETEER_CACHE_DIR=/home/pptruser/.cache/puppeteer \
    npx puppeteer browsers install chrome --install-deps

# Switch back to non-root user
USER $PPTRUSER_UID

# Copy app files
COPY package*.json ./
RUN npm ci
COPY . .

# Optional: Generate THIRD_PARTY_NOTICES (chrome credits)
RUN node -e "require('child_process').execSync(require('puppeteer').executablePath() + ' --credits', {stdio: 'inherit'})" > THIRD_PARTY_NOTICES

CMD ["node", "server.js"]
