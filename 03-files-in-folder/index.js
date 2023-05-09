const {readdir} = require('fs/promises');
const {stat} = require('fs');
const path = require('path');


async function readFilesInFolder() {
  const folderPath = path.join(__dirname, 'secret-folder');

  try {
    const files = await readdir(folderPath);
    for (const file of files) {
      stat(path.join(folderPath, file), (err, stats) => {

        if(stats.isFile()){
          console.log(`${file} является файлом:`);
          console.log(`Наименование файла: ${file}`);
          console.log(`Расширение файла: ${path.extname(file)}`);
          console.log(stats);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

readFilesInFolder().then(r => r);
