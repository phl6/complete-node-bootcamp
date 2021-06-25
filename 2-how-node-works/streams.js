const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //Solution 1 - for small files or locally, bcoz of resources consuming, (read the whole file and send to user in one batch)
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  //Solution 2: Streams (read file piece by piece-> write file to chunk -> send to user pirce by piece)
  //CONS: readStream is much faster than writeStream in real world which causes BACKPRESSURE
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => res.write(chunk));
  //   readable.on("end", () => res.end());
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500; //server error
  //     res.end("File not found");
  //   });

  //Solution 3: Pipe()
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDest)
});

server.listen(8000, "127.0.0.1", () => console.log("Listening...."));
