FROM node:22-slim AS development

# Install pnpm globally
RUN npm install -g npm

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies using pnpm
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "dev"]
