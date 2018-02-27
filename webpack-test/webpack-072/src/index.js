import './js/a.js';
import './js/b.js';

import './css/index.css'
// import './css/a.css'

$.get('/learn/ajaxteachercourse',{},function(data){
  console.log(data)
},'json')
console.log('index',+new Date())