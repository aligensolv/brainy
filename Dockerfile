FROM alpine:latest

# Set the working directory
WORKDIR /alaa_backend

# Copy the entire project into the container
COPY . /alaa_backend

# Install Node.js and npm
RUN apk add --update --no-cache nodejs npm

# Install project dependencies
RUN npm install

# Expose the port the app will run on
EXPOSE 4000

# Set environment variable
ENV name alaa_backend_project

# Command to run your application
CMD ["npm", "run", "dev"]

