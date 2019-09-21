'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import pink from './images/pink.png'
import "../../common"
import { a } from './tree-shaking'
class Search extends React.Component {

    render() {
        return (
          <div className='search-text'>
            Search Text <img src={ pink } alt=""/>
          </div>
        )
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)