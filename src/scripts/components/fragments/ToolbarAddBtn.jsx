'use strict';

import ToolbarBtn from './ToolbarBtn.jsx'
export default class ToolbarAddBtn extends ToolbarBtn{
    getProps(){
        return {
            title: "新增",
            icon:"toolbar_add.png"
        }
    }
}