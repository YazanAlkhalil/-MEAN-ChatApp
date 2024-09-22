import {readdirSync, statSync} from 'fs';
import {extname, join} from 'path';

const isDirectory = (path: string) => statSync(path).isDirectory();

export const importFiles = (directoryPath: string) => {
  const files = readdirSync(directoryPath);
  files.forEach(file => {
    const filePath = join(directoryPath, file);
    if (isDirectory(filePath)) {
      importFiles(filePath);
    } else if (extname(filePath) === '.js') {
      console.log(filePath);
      require(filePath);
    }
  });
};
