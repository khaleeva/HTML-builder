const { mkdir, copyFile, readdir} = require('fs/promises');

const path = require('path');
const folderPath = path.join(__dirname, 'files');

async function copyFiles (folderPath) {

  try {
    const projectFolder = path.join(__dirname, 'files-copy');
    await mkdir(projectFolder, { recursive: true });
    const files = await readdir(folderPath);
    for(const file of files){
      await copyFile(path.join(folderPath, file), path.join(projectFolder, file));
      console.log(`${file} успешно скопирован в ${projectFolder}`);
    }

  } catch (err) {
    console.error(err.message);
  }
}

copyFiles(folderPath);



