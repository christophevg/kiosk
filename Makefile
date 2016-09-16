all: run

run:
	@echo "*** starting a simple HTTP webserver"
	@python -m SimpleHTTPServer 8080
