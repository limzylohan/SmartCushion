const hbs = require('hbs');
const path = require('path');


//register partials path
const partialsPath = path.join(__dirname, './templates/partials')

hbs.registerPartials(partialsPath)


// //HandleBars custom functions
// hbs.registerHelper('activeCourse', function (property) {
//     if (property != 0 && property != 24) {
//         return true
//     }
//     return false
// });