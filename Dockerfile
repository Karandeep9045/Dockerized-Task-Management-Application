FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_ENABLE_MSW=true
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
