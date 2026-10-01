DIST := dist

.PHONY: all clean

all:
	mkdir -p $(DIST)
	minhtml \
	  --minify-css \
	  --minify-js \
	  --minify-doctype \
	  --allow-optimal-entities \
	  --allow-removing-spaces-between-attributes \
	  -o dist/index.html \
	  index.html

clean:
	rm -rf $(DIST)
