install:
	npm install

start:
	node server/server.js

build:
	npm run build

test:
	npm test

lint:
	npx eslint .

.PHONY: test
