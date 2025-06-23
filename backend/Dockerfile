# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and lockfile first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Start the app
CMD ["npm", "start"]
