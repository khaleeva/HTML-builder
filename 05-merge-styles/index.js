const {readdir} = require('fs/promises');

const path = require('path');
const fs = require('fs');
const { stat } = require('fs');

const filePath = path.join(__dirname, 'project-dist', 'bundle.css');
const folderPath = path.join(__dirname, 'styles');

async function copyStylesFiles(filePath, folderPath) {

  fs.writeFile(filePath, '',
    (err) => {
      if (err) throw err;
    }
  );

  try {
    const files = await readdir(folderPath);
    for (const file of files) {
      stat(path.join(folderPath, file), (err, stats) => {
        if(stats.isFile() && path.extname(file) === '.css'){
          const readStream = fs.createReadStream(path.join(folderPath, file));
          readStream.on('data', async (chunk) => {
            await fs.promises.appendFile(filePath, chunk.toString());
          });
          readStream.on('end', () => {
            console.log(`${file} успешно скопирован в ${filePath}`);
          });

          readStream.on('error', (err) => {
            console.log(err);
          });
        }
      });
    }

  } catch (err) {
    console.error(err.message);
  }

}

if (require.main === module) {
  copyStylesFiles(filePath, folderPath);
}



module.exports = {copyStylesFiles};
