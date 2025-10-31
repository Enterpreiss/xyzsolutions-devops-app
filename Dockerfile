# Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
