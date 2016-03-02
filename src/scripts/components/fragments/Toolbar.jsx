'use strict';

import React from 'react'
import { render } from 'react-dom'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Toolbar extends React.Component{

    render(){
        return (
            <div className="toolbar_wrapper">
                <div className="toolbar">
                    {this.props.children}
                </div>
            </div>
        )
    }

}

export default Toolbar