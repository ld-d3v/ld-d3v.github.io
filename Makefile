DIST := dist
PAGES := index.html me.html
SCRIPTS := content.js writeup.js site.js ui.js index.js me.js
STYLES := site.css
ESBUILD := npx --yes esbuild@0.25

.PHONY: all clean

all: clean
	mkdir -p $(DIST)
	for f in $(PAGES); do \
	  minhtml \
	    --minify-css \
	    --minify-js \
	    --minify-doctype \
	    --allow-optimal-entities \
	    --allow-removing-spaces-between-attributes \
	    -o $(DIST)/$$f $$f; \
	done
	$(ESBUILD) $(SCRIPTS) $(STYLES) --minify --outdir=$(DIST)
	cp -r assets $(DIST)/
	cp robots.txt sitemap.xml $(DIST)/

clean:
	rm -rf $(DIST)
