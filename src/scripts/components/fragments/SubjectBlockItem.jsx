'use strict';

import React, { Component, PropTypes } from 'react'
import {render} from 'react-dom'

export default class SubjectBlockItem extends React.Component{
    render(){
        return <div clasName="clearfix subject-block-item" onClick={this.props.onClick}>{this.props.children}</div>
    }
}
SubjectBlockItem.propTypes = {
    onClick:PropTypes.func.isRequired
}