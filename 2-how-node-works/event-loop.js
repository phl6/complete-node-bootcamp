const fs = require("fs");
const crypto = require("crypto");

console.log("-------------------------------------");
console.log("Outside event loop");
console.log("-------------------------------------");
const start = Date.now();
// process.env.UV_THREADPOOL_SIZE = 4; //setting Thread Pool size

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

//inside event loop (callbacks are in event loop)
fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("-------------------------------------");
  console.log("Inside event loop");
  console.log("-------------------------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 0);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick()"));

  //encrypting password (SYNCHRONISED WAY)
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(`Password Encrypted in ${(Date.now() - start) / 1000} seconds`);

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(`Password Encrypted in ${(Date.now() - start) / 1000} seconds`);

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(`Password Encrypted in ${(Date.now() - start) / 1000} seconds`);

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(`Password Encrypted in ${(Date.now() - start) / 1000} seconds`);

  //encrypting password (ASYNCHRONISED WAY)
  //   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //     console.log(`Password Encrypted in ${(Date.now() - start) / 1000} seconds`);
  //   });

  //   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //     console.log(`Password Encrypted in ${(Date.now() - start) / 1000} seconds`);
  //   });

  //   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //     console.log(`Password Encrypted in ${(Date.now() - start) / 1000} seconds`);
  //   });
});

console.log("Hello from the top level code");
