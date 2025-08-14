serveur:
	@clear
	@node ./Backend/index.js

client:
	@clear
	@cd Frontend && npm start

test:
	@clear
	@node ./Backend/Test/test.js