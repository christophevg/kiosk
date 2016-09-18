all: run

run:
	@echo "*** starting a simple HTTP webserver"
	@(cd src; python -m SimpleHTTPServer 8080)
