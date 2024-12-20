# Base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app to the container
COPY . .

# Build the React app for production
RUN npm run build

# Install a lightweight static file server (optional, for serving production files)
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app using `serve` to serve the production build
CMD ["serve", "-s", "build", "-l", "3000"]
