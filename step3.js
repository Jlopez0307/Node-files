const fs = require('fs');
const process = require('process')
const axios = require('axios');



const fileOut = (text, out) => {
    if(out){
        fs.writeFile(out, text, 'utf8', (err) => {
            if(err){
                console.log(`Couldnt write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

const readFile = (file,out) => {
    fs.readFile(file, 'utf8', (err, data) => {

        if(err){
            console.log(`Error reading ${file}:`, err);
            process.exit(1);
        } else{
            fileOut(data, out)
        }
    });
}

const webCat = async (URL) => {
    try{
        const web = await axios.get(URL)
        console.log(web.data);

    } catch (err) {
        console.log(`Error fetching ${URL}`, err)
        process.exit(1);
    }
    
};

const cat = (path, out ) => {
    readFile(path,out);
};

let path;
let out;

if(process.argv[2] === '--out'){
    out = process.argv[3];
    path = process.argv[4];
} else{
    path = process.argv[2];
}

if(path.slice(0,4) === 'http'){
    webCat(path, out)
} else {
    cat(path,out)
}