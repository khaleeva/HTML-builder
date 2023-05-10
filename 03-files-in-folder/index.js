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
          console.log(`${file} - ${path.extname(file).replace('.', '')} - ${(stats.size/1024).toFixed(3)}kb`);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

readFilesInFolder().then(r => r);
