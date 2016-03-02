/**
 * Created by hlw on 2016/1/7.
 */
'use strict';
import React from 'react';
import { Router, Route, Link } from 'react-router';

const App = React.createClass({
    render(){
        return <div id="App">{this.props.children}</div>
    }
});

export default App;