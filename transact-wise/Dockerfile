# Stage 1: Build the Next.js application
FROM node:latest as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY transact-wise/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY transact-wise/ .

# Build the application
RUN npm run build

# Stage 2: Set up the Python environment
FROM python:3.10

WORKDIR /api

# Copy the Python requirements and install them
COPY transact-wise/requirements.txt .
RUN pip install -r requirements.txt

# Copy the Python API
COPY transact-wise/api .

# Stage 3: Final setup
FROM node:latest

WORKDIR /app

# Copy the Next.js build from Stage 1
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

# Copy the Python environment from Stage 2
COPY --from=python /api /api

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
