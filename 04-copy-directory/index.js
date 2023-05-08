const { mkdir, copyFile, readdir, stat, rmdir } = require('fs/promises');
const path = require('path');



async function copyFiles(srcDir, destDir) {
  await mkdir(destDir, { recursive: true });
  const entries = await readdir(srcDir);
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry);
    const destPath = path.join(destDir, entry);
    const stats = await stat(srcPath);
    if (stats.isDirectory()) {
      await copyFiles(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
      console.log(`${entry} успешно скопирован в ${destPath}`);
    }
  }
}

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

rmdir(destDir, { recursive: true })
  .then(() => {
    return copyFiles(srcDir, destDir);
  })
  .catch((err) => {
    console.error(err);
  });



module.exports = {copyFiles};

