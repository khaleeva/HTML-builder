const path = require('path');
const fs = require('fs');
const readline = require('node:readline');
const pathFile = path.join(__dirname, 'text.txt');
const { stdin, stdout } = require('process');

fs.writeFile(pathFile, '',
  (err) => {
    if (err) throw err;
  }
);

const rl = readline.createInterface({input: stdin, output: stdout});

rl.write('Что записать в файл?\n');

rl.on('line', (text) => {
  if (text === 'exit') {
    rl.close();
    return;
  }
  fs.appendFile(
    pathFile, `${text}\n`,
    err => {
      if (err) throw err;
    });
})
;

rl.on('close', () => {
  console.log('Прощай!');
});

rl.on('SIGINT', rl.close);


