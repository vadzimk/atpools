FROM node:16.13-alpine
WORKDIR /usr/src/app
COPY * .
RUN npm ci --silent
EXPOSE 3001
CMD ["npm", "start"]