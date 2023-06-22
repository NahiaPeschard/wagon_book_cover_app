# Use an official lightweight Node.js 16 image.
FROM node:16-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build app
RUN npm run build

# Install `serve` to run the application.
RUN npm install -g serve

# The app binds to port 5000, so you use the EXPOSE instruction to have it mapped by the Docker daemon
EXPOSE 3000

# Serve the app
CMD serve -s build
