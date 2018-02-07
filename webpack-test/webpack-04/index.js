import './css/a.css';
import './css/b.css';

import(/**webpackChunkName:'components.css*/'./components/components.js').then(function(data){
  console.log(data)
})