FROM node:12.12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN mkdir image_uploads
RUN mkdir compressed_image_uploads

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app

# Move the wait-for-it script   
COPY wait-for-it.sh /
CMD chmod +x wait-for-it.sh

EXPOSE 3001

CMD /wait-for-it.sh mysql:3306 -t 0 -- npm start