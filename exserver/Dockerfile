FROM node:21-alpine3.18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port (if your application uses a specific port)
EXPOSE 8000

# Start the application
CMD npm start