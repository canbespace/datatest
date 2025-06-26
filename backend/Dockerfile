# Dockerfile at project root
FROM node:18

# Set app directory
WORKDIR /app

# Copy backend files
COPY package*.json ./
COPY . .

# Install backend dependencies
RUN npm install

# Build frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Back to server root
WORKDIR /app

# Tell Express where to find frontend build
RUN mv client/build ./client_build

# Use original index.js to serve frontend and API
CMD [ "node", "index.js" ]
