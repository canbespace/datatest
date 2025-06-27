FROM node:20

# Backend setup
WORKDIR /datatest/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Frontend setup
WORKDIR /datatest/frontend
COPY datatest/frontend/package*.json ./
RUN npm install
COPY datatest/frontend/ ./
RUN npm run build

# Move frontend build into backend public folder
WORKDIR /datatest/backend
RUN mkdir -p client_build
RUN cp -r /datatest/datatest/frontend/build/* ./client_build/

# Start server
CMD ["node", "index.js"]
