const net = require('net');
const fs = require('fs');

/*
          NOTE: For the first argument DONT INCLUDE http:// or ./index.html

          USE: node fetcher.js example.edu index.html

*/


const INFO = process.argv.slice(2);
const URL = INFO[0];
const PATH = INFO[1];

const conn = net.createConnection({ 
  host: `${URL}`,
  port: 80
});
conn.setEncoding('UTF8');

conn.on('connect', () => {
  console.log(`Connected to server!`);

  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: example.edu\r\n`);
  conn.write(`\r\n`);
});

conn.on('data', (data) => {
  console.log(data);
  fs.writeFile(`${PATH}`, data, (err) => {
    if (err)
      console.log(err);
  })
  conn.end();
});


