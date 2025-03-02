const fs = require('fs');
fs.readdir('secret-folder', (error, files) => {
    if (error) {
        return console.log(error);
    }
    files.forEach((file) => {
        fs.stat(`./secret-folder/${file}`, (err, stats) => {
            if (err) {
                console.error(err)
                return
            }
            if (stats.isFile()) {
                console.log(file.split('.')[0]+'-'+file.split('.')[1]+'-'+stats.size+'kb');
            };
        })

    });
})