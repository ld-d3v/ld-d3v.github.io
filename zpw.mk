# zpw bundle in lib/
# make zpw        re-download the pinned release
# make zpw-local  build zpw from ZPW_LOCAL and copy it (dev only)
ZPW_VERSION := v1.0.0
ZPW_URL := https://github.com/lukedaoo/zpw/releases/download/$(ZPW_VERSION)

ZPW_LOCAL ?= ../zod/zpw
ZPW_LIB := lib/zpw.min.js lib/zpw.min.css

.PHONY: zpw zpw-local

$(ZPW_LIB): lib/zpw.min.%:
	@mkdir -p lib
	curl -fsSL -o $@ $(ZPW_URL)/zpw-$(ZPW_VERSION).min.$*

zpw:
	rm -f $(ZPW_LIB)
	$(MAKE) -f zpw.mk $(ZPW_LIB)

zpw-local:
	@mkdir -p lib
	$(MAKE) -B -C $(ZPW_LOCAL) -f bundle.js.mk dist/zpw.min.js dist/zpw.min.css
	cp $(ZPW_LOCAL)/dist/zpw.min.js $(ZPW_LOCAL)/dist/zpw.min.css lib/
	@echo "zpw-local: $$(head -n1 lib/zpw.min.js)"
