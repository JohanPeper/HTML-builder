const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function repeatEntry (){
rl.question('Hello! Enter some text or press Ctrl + d', (answer) => {
    fs.appendFile('text.txt', answer + '\n' , function(error){
        if(error){  
            return console.log(error);
        }
    })
    console.log('Thanks, text is written to text.txt');
    rl.emit('line');
})}
rl.on('line', repeatEntry);
repeatEntry();