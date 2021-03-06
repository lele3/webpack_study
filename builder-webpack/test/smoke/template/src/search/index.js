'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import pink from './images/pink.png'
import "../../common"
import { a } from './tree-shaking'
class Search extends React.Component {
    constructor() {
      super()
      this.state = {
        Text: null
      }
    }
    dynamicImport(){
      console.log('动态import')
      import ('./dynamic-import').then(Text => {
        console.log(Text.default)
        this.setState({
          Text: Text.default
        })
      }) 
    }

    render() {
        const { Text } = this.state
        return (
          <div className='search-text'>
            {
              Text && <Text />
            }
            Search Text <img src={ pink } alt="" onClick={this.dynamicImport.bind(this)}/>
          </div>
        )
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)