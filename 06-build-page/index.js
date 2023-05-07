const copyStyle = require('../05-merge-styles/index');
const copyFiles = require('../04-copy-directory/index');
const path = require('path');
const {readFile, writeFile} = require('fs');
const {readdir} = require('fs/promises');

async function copyDir(srcDir, destDir) {
  await copyFiles.copyFiles(srcDir, destDir);
  await copyStyle.copyStylesFiles(path.join(__dirname, 'project-dist', 'style.css'), path.join(__dirname, 'styles'));
  await buildHTML();
}

const srcDir = path.join(__dirname, 'assets');
const destDir = path.join(__dirname, 'project-dist', 'assets');


copyDir(srcDir, destDir);




async function buildHTML(){
  try {
    const templatePath = path.join(__dirname, 'template.html');
    let contentTemplate = '';
    readFile(templatePath, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      contentTemplate = data.toString();
    });

    const componentFilaPath = path.join(__dirname, 'components');
    const files = await readdir(componentFilaPath);
    for(const file of files) {
      const componentName = path.basename(file, path.extname(file));
      const regExp = new RegExp(`{{\\s*${componentName}\\s*}}`, 'g');
      readFile(path.join(componentFilaPath, file), (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const content = data.toString();
        contentTemplate = contentTemplate.replace(regExp, content);
        const projectDir = path.join(__dirname, 'project-dist');
        const indexPath = path.join(projectDir, 'index.html');
        writeFile(indexPath, contentTemplate, (err) => {
          if (err) throw err;
        });
      });

    }



  } catch (err){
    console.error(err.message);
  }

}


