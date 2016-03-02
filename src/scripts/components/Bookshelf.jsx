'use strict';
import React from 'react'
import { render } from 'react-dom'
import Toolbar from './fragments/Toolbar.jsx'
import ToolbarBtn from './fragments/ToolbarBtn.jsx'
import ToolbarBackBtn from './fragments/ToolbarBackBtn.jsx'
import ToolbarListBtn from './fragments/ToolbarListBtn.jsx'
import ToolbarSearchBtn from './fragments/ToolbarSearchBtn.jsx'

export default class Bookshelf extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null,
            onModify: false
        };
    }

   render() {
       return (
           <div>
               <Toolbar>
                    <ToolbarBackBtn></ToolbarBackBtn>
                    <ToolbarSearchBtn></ToolbarSearchBtn>
                    <ToolbarListBtn right={true}></ToolbarListBtn>
               </Toolbar>
               <span>Bookshelf page!!</span>
           </div>
       );
   }
};