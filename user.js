const fs = require("fs");

const userRequestHandler = (request, response) => {
  response.setHeader("Content-Type", "text/html");

  if (request.url == "/") {
    response.write(`<html>`);
    response.write(`<h1>Welcome to the Home Page</h1>`);
    response.write(`<form action="/submit-details" method="POST">`);
    response.write(
      `<input type="text" id="name" name="username" placeholder="Enter your name"><br><br>`
    );
    response.write(`<label for="gender"> Male: </label>`);
    response.write(`<input type="radio" id="male" name="gender" value="male">`);
    response.write(`<label for="gender"> Female: </label>`);
    response.write(
      `<input type="radio" id="female" name="gender" value="female">`
    );
    response.write(`<button type="submit" value="Submit">Submit</button>`);
    response.write(`</form>`);
    response.write(`</html>`);
    return response.end();
  } else if (
    request.url.toLowerCase() === "/submit-details" &&
    request.method == "POST"
  ) {
    const chuckArray = [];
    request.on("data", (chunk) => {
      chuckArray.push(chunk);
    });
    request.on("end", () => {
      const parsedBody = Buffer.concat(chuckArray).toString();
      const params = new URLSearchParams(parsedBody);
      const dataObj = Object.fromEntries(params);
      const dataJson = JSON.stringify(dataObj);
      fs.writeFileSync("data.txt", dataJson);
    });

    response.statusCode = 302;
    response.setHeader("Location", "/");
    return response.end();
  }
};

module.exports = userRequestHandler;
