const http = require("http");
const userRequestHandler = require("./user");

const server = http.createServer(userRequestHandler);

server.listen(3000, () => {
  console.log(`Server running on port: 3000`);
});
