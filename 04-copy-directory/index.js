const { mkdir, copyFile, readdir, stat, rm } = require('fs/promises');
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

rm(destDir, { recursive: true, force: true })
  .then(() => {
    return copyFiles(srcDir, destDir);
  })
  .catch((err) => {
    if (err.code === 'ENOENT') {
      return copyFiles(srcDir, destDir);
    } else {
      console.error(err);
    }
  });



module.exports = {copyFiles};

