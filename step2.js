const fs = require('fs');
const process = require('process')
const axios = require('axios');

const readFile = (file) => {
    fs.readFile(file, 'utf8', (err, data) => {

        if(err){
            console.log(`Error reading ${file}:`, err);
            process.exit(1);
        };
    
        console.log(data);
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

const cat = (path) => {

    if(path.slice(0,4) === 'http'){
        webCat(path);
    } else {
        readFile(path);
    }
};

cat(process.argv[2]);
