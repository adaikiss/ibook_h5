'use strict';

import React, { Component, PropTypes } from 'react'
import {render} from 'react-dom'

export default class SubjectBlockItem extends React.Component{
    render(){
        return <div className="clearfix subject_block_item" onClick={this.props.onClick} style={this.props.style||{}}>{this.props.children}</div>
    }
}
SubjectBlockItem.propTypes = {
    onClick:PropTypes.func.isRequired
}