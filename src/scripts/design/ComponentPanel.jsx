/**
 * Created by HuLingwei on 2016/3/10.
 */
'use strict';
import React from 'react'
import {render} from 'react-dom'
import SubjectBook from '../components/fragments/SubjectBook.jsx'

export default class ComponentPanel extends React.Component{
    render(){
        return (
            <div id="component-panel">
                <div data={{type:0, name:"书籍"}} className="component_template"></div>
                <div data={{type:3, name:"样式块"}} className="component_template"></div>
            </div>
        )
    }
}