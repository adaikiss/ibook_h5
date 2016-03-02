'use strict';

import React from 'react'
import { render } from 'react-dom'

export default class ToolbarSearchBtn extends React.Component {
    render() {
        return (
            <div className="toolbar_round_rectangle">
                {this.props.center?
                    (<div className="toolbar_search_btn_wrapper">
                        <div className="toolbar_search_btn" onClick={this.props.handleClick||noop}>{this.props.title}</div>
                    </div>)
                    :
                    (<div className="toolbar_search_btn" onClick={this.props.handleClick||noop}>{this.props.title}</div>)}
            </div>
        );
    }
}