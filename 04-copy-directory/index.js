const { mkdir, copyFile, readdir} = require('fs/promises');

const path = require('path');

async function copyFiles () {
  const folderPath = path.join(__dirname, 'files');

  try {
    const projectFolder = path.join(__dirname, 'files-copy');
    await mkdir(projectFolder, { recursive: true });
    const files = await readdir(folderPath);
    for(const file of files){
      await copyFile(path.join(folderPath, file), path.join(projectFolder, file));
      console.log(`${file} успешно скопирован в ${folderPath}`);
    }

  } catch (err) {
    console.error(err.message);
  }
}

copyFiles();



