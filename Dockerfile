FROM node:16-alpine

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .

# Copy app files
COPY . .


# Build the app
RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]