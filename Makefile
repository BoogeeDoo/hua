BROWSERIFY_PATH=./node_modules/.bin/browserify
UGLIFYJS_PATH=./node_modules/.bin/uglifyjs

install:
	@npm install

build-dev: install
	@$(BROWSERIFY_PATH) -s Hua \
		-r ./dict/chuci.json -r ./dict/shijing.json -r ./dict/songci.json -r ./dict/tangshi.json \
		-r ./hua.js -o ./hua.min.js

build: build-dev
	@$(UGLIFYJS_PATH) hua.min.js -o hua.min.js --reserved "module,exports,hua" \
		--source-map hua.min.map -c -m sort

clean-build:
	@rm -f hua.min.js

clean: clean-build
	@rm -rf node_modules

test:
	@npm test

.PHONY: test
