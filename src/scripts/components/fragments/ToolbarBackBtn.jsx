'use strict';

import ToolbarBtn from './ToolbarBtn.jsx'
export default class ToolbarBackBtn extends ToolbarBtn{
    getProps(){
        return {
            title: "后退",
            icon:"toolbar_back.png"
        }
    }
}