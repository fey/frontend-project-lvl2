.PHONY: test

install:
	npm install

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npm test -- --watchAll

make link:
	npm link