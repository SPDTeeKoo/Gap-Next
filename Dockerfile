# Use an official Node.js image as the base image
FROM node:18-buster-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install


# Copy the rest of the application code to the container
COPY . .

# Expose the port that Next.js will run on
EXPOSE 3010

# Command to run the application
CMD ["npm", "run", "dev"]