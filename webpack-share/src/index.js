import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader'
import { Button, Icon } from 'antd';
import $ from 'jquery';
 
import { A } from 'Js/a.js';
import './js/b.js';

import tool from './tool'

import {say, play} from 'says.js'
console.log(say,play)

const Ajax = () => {
  $.get('/404',{id: '110'},(data) => {
    console.log(data,'daya')
  },'json')
}

const App = () => {
  return (
    <div>
      <h2>hhhsah</h2>
      <A/>
      <Button type="primary" onClick={() => {Ajax()}}>priary</Button>
      <Icon type="search" />
    </div>
  )
}

// if(module.hot){
//   module.hot.accept('./js/a.js', (a) => {
//     console.log(a)
//   })
// }
// console.log(module)
// hot(module)(App)

ReactDOM.render(<App />,document.getElementById('root'))
