FIRST working backend request-response cycle:

When you ran: npx nodemon server.js

this happened internally:

Node executed server.js
Express app got created
Route / got registered
Server started listening on port 5000
Browser request came in
Express matched /

Server responded:API Running