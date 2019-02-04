install:
	npm install

start:
	node server/server.js

build:
	npm run build
	npx webpack -p --env production && npx babel src --out-dir dist --source-maps inline

test:
	npm test

lint:
	npx eslint .

.PHONY: test
