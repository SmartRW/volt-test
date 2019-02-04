install: npm install

start:
	node server/server.js

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint .

.PHONY: test
