const fs = require('fs');
const path = require('path');
const folderPath = './styles';


fs.mkdir('project-dist', (err) => {
    if (err) {
        return console.log(err);
    }
});

fs.writeFile('./project-dist/bundle.css', '', (err) => {
    if (err) {
        return console.log(err);
    }
})

fs.readdir(folderPath, (err, files) => {
    if (err) {
        return console.log(err);
    }
     files.forEach((file) => {
         if (path.extname(`${folderPath}/${file}`) == '.css') {
            fs.readFile(`${folderPath}/${file}`, (err, data) => {
                if (err) {
                 return console.error(err)
                    
                }
                fs.appendFile('./project-dist/bundle.css', data, (err) => {
                    if (err) {
                        return console.log(err);
                    }
                })
            })

         }
     })
})



