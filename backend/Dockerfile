# Use official Node image
FROM node:18

# Set working directory for backend
WORKDIR /datatest/backend

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy all backend source code
COPY backend/ ./

# --- Build Frontend ---

# Set working directory for frontend
WORKDIR /datatest/frontend

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code and build
COPY frontend/ ./
RUN npm run build

# --- Merge frontend build into backend ---

# Switch back to backend folder
WORKDIR /datatest/backend

# Move built frontend files into backend
RUN mkdir -p client_build
RUN cp -r /datatest/frontend/build/* ./client_build/

# Start backend server
CMD ["node", "index.js"]
