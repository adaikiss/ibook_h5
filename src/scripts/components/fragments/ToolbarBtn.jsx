'use strict';

import React from 'react'
import { render } from 'react-dom'

(function(requireContext) {
    return requireContext.keys().map(requireContext);
})(require.context("../../../images", true, /^\.\/toolbar_.*\.png$/));

export default class ToolbarBtn extends React.Component {
    iconPath = "/assets/images/";
    getProps() {
        return {
            title: "",
            className: "",
            icon: ""
        }
    }

    handleClick() {
        console.log(this.getProps().title + ' clicked!');
    }

    render() {
        var props = this.getProps();
        return (
            <a className={"toolbar_btn_wrapper " + (this.props.right?"toolbar_btn_wrapper_right":"")}
               onClick={this.handleClick.bind(this)}>
                {props.icon ? <img className="toolbar_btn" src={this.iconPath + props.icon  }/> : ""}
            </a>
        );
    }
}