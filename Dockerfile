
FROM node:16.14.0

# Set working directory
WORKDIR /app

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

RUN npm run build

# Expose the listening port
EXPOSE 3000

# Launch app with PM2
CMD [ "npm", "run", "start"]