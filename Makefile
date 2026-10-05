DIST := dist
PAGES := index.html
DECKS := $(sort $(wildcard decks/*.js))
SCRIPTS := lib/zpw.min.js content.js updates.js blogs-index.js $(DECKS) index.js
STYLES := lib/zpw.min.css index.css
ESBUILD := npx --yes esbuild@0.25

.DEFAULT_GOAL := all
include zpw.mk

SITE_URL := https://ld-d3v.github.io/
FAVICON := assets/favicon.svg

PANDOC := pandoc --from markdown --to html5 --standalone --wrap=none --template=build-artifact/post.html
POSTS := $(wildcard posts/*.md)
SLUGS := $(basename $(notdir $(POSTS)))
BLOG_PAGES := $(SLUGS:%=blogs/%.html)

.PHONY: all index compile-blogs minify clean

all: $(ZPW_LIB) index compile-blogs minify

index: blogs-index.js

blogs-index.js: $(POSTS) build-artifact/entry.tpl Makefile
	@{ \
	  echo "["; sep=""; \
	  for f in $(POSTS); do \
	    slug=$$(basename $$f .md); \
	    printf '%s' "$$sep"; sep=","; \
	    pandoc --from markdown --to plain --standalone \
	      --template=build-artifact/entry.tpl \
	      --metadata slug=$$slug \
	      --metadata url=blogs/$$slug.html $$f; \
	  done; \
	  echo "]"; \
	} | python3 -c 'import json,sys; print("const BLOGS_INDEX = " + json.dumps(json.load(sys.stdin), indent=4, ensure_ascii=False) + ";")' > $@

compile-blogs: $(BLOG_PAGES)

blogs/%.html: posts/%.md build-artifact/post.html
	@mkdir -p $(@D)
	$(PANDOC) -V slug=$* -V siteurl=$(SITE_URL) -V favicon=../$(FAVICON) \
	  -V style=../lib/zpw.min.css -V script=../lib/zpw.min.js $< -o $@

REWRITE := sed -E \
	-e '/<link[^>]*href="index\.css"/d' \
	-e '/<script[^>]*src="(content|updates|blogs-index|index|decks\/[^"]*)\.js"/d' \
	-e 's|lib/zpw\.min\.css|bundle.min.css|' \
	-e 's|lib/zpw\.min\.js|bundle.min.js|'

minify: index compile-blogs
	rm -rf $(DIST)
	mkdir -p $(DIST)
	for f in $(PAGES) $(BLOG_PAGES); do \
	  mkdir -p $(DIST)/$$(dirname $$f); \
	  $(REWRITE) $$f > $(DIST)/$$f.pre; \
	  minhtml \
	    --minify-css \
	    --minify-js \
	    --minify-doctype \
	    --allow-optimal-entities \
	    --allow-removing-spaces-between-attributes \
	    -o $(DIST)/$$f $(DIST)/$$f.pre; \
	  rm $(DIST)/$$f.pre; \
	done
	cat $(SCRIPTS) | $(ESBUILD) --loader=js --minify > $(DIST)/bundle.min.js
	cat $(STYLES) | $(ESBUILD) --loader=css --minify > $(DIST)/bundle.min.css
	cp -r assets $(DIST)/
	cp robots.txt $(DIST)/
	@{ \
	  echo '<?xml version="1.0" encoding="UTF-8"?>'; \
	  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'; \
	  echo '  <url><loc>$(SITE_URL)</loc></url>'; \
	  for f in $(POSTS); do \
	    slug=$$(basename $$f .md); \
	    date=$$(pandoc --from markdown --to plain --standalone \
	      --template=build-artifact/lastmod.tpl $$f | tr -d '[:space:]'); \
	    mod=""; \
	    [ -n "$$date" ] && mod="<lastmod>$$date</lastmod>"; \
	    echo "  <url><loc>$(SITE_URL)blogs/$$slug.html</loc>$$mod</url>"; \
	  done; \
	  echo '</urlset>'; \
	} > $(DIST)/sitemap.xml

clean:
	rm -rf $(DIST)
