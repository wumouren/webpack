import './css/a.css';
import './css/b.css';
// import './components/components'
import(/*webpackChunkName:'components'*/ './components/components').then(function(data){
  console.log(data)
})