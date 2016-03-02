'use strict';

import ToolbarBtn from './ToolbarBtn.jsx'

export default class ToolbarListBtn extends ToolbarBtn{
    getProps(){
        return {
            title: "列表",
            icon:"toolbar_list.png"
        }
    }
}