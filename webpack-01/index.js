import es6 from './js/ES6module';

const common = require('./js/common');

require(['./js/amd'],function(amd){
  console.log('amd(10,5)= ',amd(10,5))
})

console.log('common(10,5)=',common(10,5))

console.log('es6(10,5) =',es6(10,5))