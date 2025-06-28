# base image
FROM node:20

# --- Backend install ---
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# --- Frontend build ---
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./

RUN ls -la
RUN cat package.json

RUN chmod +x node_modules/.bin/react-scripts
RUN npm run build

# --- Move React build into backend ---
WORKDIR /app/backend
RUN mkdir -p client_build
RUN cp -r /app/frontend/build/* ./client_build/

# --- Start server ---
CMD ["node", "index.js"]
