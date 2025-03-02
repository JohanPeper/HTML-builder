const fs = require('fs');
const path = require('path');


function copyFolder(src, dest) {
    
    fs.mkdir(dest, { recursive: true }, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        fs.readdir(src, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.error(err);
                return;
            }

            files.forEach(file => {
                const srcPath = path.join(src, file.name);
                const destPath = path.join(dest, file.name);

                if (file.isDirectory()) {

                    copyFolder(srcPath, destPath);
                } else {

                    fs.copyFile(srcPath, destPath, (err) => {
                        if (err) {
                            console.error( err);
                        } 
                    });
                }
            });
        });
    });
}


const sourceFolder = path.join(__dirname, 'files');
const destinationFolder = path.join(__dirname, 'files-copy');

copyFolder(sourceFolder, destinationFolder);