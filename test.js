const {parse} = require('mdj')

console.log(JSON.stringify(parse('### test'), null, 4))
