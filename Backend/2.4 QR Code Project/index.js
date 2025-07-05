/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
    message: "What is the URL you want to turn into a QR code?",
    name: "url"
  }
  ])
  .then((answers) => {
    const Url = answers.url;
    var qr_svg = qr.image(Url);
    qr_svg.pipe(fs.createWriteStream('Url.png'));
    fs.writeFile('Url.txt', Url, (err) => {
      if (err) throw err;
      console.log('URL saved to Url.txt');
    });
     
    // var svg_string = qr.imageSync(Url, { type: 'svg' });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

 