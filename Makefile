###############################################
#
# Makefile
#
###############################################

.DEFAULT_GOAL := build

deps:
	npm install

lint:
	node_modules/tslint/bin/tslint --project tslint.json src/**.ts

build:
	tsc -t ES5 --lib es2017 --alwaysStrict src/**.ts

watch:
	tsc -t ES5 --lib es2017 --alwaysStrict -watch --diagnostics src/**.ts

run:
	node src/main.js

clean:
	rm src/*.js
