FROM node:14-alpine

WORKDIR /app

ENV NODE_ENV=production
# `/app/node_modules/.bin`을 $PATH 에 추가 (yarn start 명령어 쓰기 위해)
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]