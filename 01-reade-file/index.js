const fs = require('fs');
fs.readFile('text.txt', (error, file)=>{
    if(error){
        return console.log(error);
    }
    console.log(file.toString());
})