# Dockerfile at project root
FROM node:18

# Set app directory
WORKDIR /datatest/backend

# Copy backend files
COPY backend/package*.json ./
COPY . .

# Install backend dependencies
RUN npm install

# Build frontend
WORKDIR /datatest/frontend
COPY package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Back to server root
WORKDIR /backend

# Tell Express where to find frontend build
RUN mv client/build ./client_build

# Use original index.js to serve frontend and API
CMD [ "node", "index.js" ]
