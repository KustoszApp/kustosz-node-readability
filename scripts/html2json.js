const fs = require('fs');

fs.readFile(process.argv[2], {encoding: 'utf-8', flag: 'r'}, (err, html) => {
    if (err) throw err;
    const data = {html: html, url: 'http://localhost/'}
    console.log(JSON.stringify(data));
});
