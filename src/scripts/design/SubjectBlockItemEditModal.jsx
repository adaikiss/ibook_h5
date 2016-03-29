'use strict'

import React from 'react'
import {render} from 'react-dom'
import FormModal from './FormModal.jsx'
import LinkTagForm from './LinkTagForm.jsx'
import BookForm from './BookForm.jsx'
import BannerForm from './BannerForm.jsx'
import {BootstrapButton} from './Bootstrap.jsx'

export default class SubjectBlockItemEditorModal extends FormModal {
    constructor(props) {
        super(props);
    }

    open(){
        this.refs.content.forceUpdate();
        super.open();
    }

    handleConfirm(){
        var form = this.root().find('form');
        if(STORE.subjectBlockItemEditorData.mode == 'add'){
            form.each((index, item) => {STORE.subjectBlockItemEditorData.subjectBlockData.items.push($(item).params(true));});
        }else{
            Utils.extend(STORE.subjectBlockItemEditorData.itemData[0], form.params(true));
        }
        if(STORE.subjectBlockItemEditorData.callback){
            STORE.subjectBlockItemEditorData.callback();
        }
        this.close();
    }
    handleCancel(){
        Utils.clean(STORE.subjectBlockItemEditorData);
        super.handleCancel();
    }
    render(){
        return super.render(<SubjectBlockItemEditorModalContent ref="content"/>);
    }
}
export class SubjectBlockItemEditorModalContent extends React.Component {
    constructor(props){
        super(props);
        this.state = STORE.subjectBlockItemEditorData;
    }
    handleValueChange(event){
        this.forceUpdate();
    }
    render(){
        if(this.state.mode == null){
            return <div className="template_form"></div>
        }
        var forms = [];
        var itemData = this.state.itemData;
        switch(this.state.subjectBlockData.itemType){
            case 0:
                itemData.map((item, index) => forms.push(<BookForm data={item} handleValueChange={this.handleValueChange.bind(this)} key={index}/>));
                break;
            case 2:
                itemData.map((item, index) => forms.push(<BannerForm data={item} handleValueChange={this.handleValueChange.bind(this)} key={index}/>));
                break;
            case 5:
                itemData.map((item, index) => forms.push(<LinkTagForm data={item} handleValueChange={this.handleValueChange.bind(this)} key={index}/>));
                break;
        }
        return (
            <div className="template_form">
                {this.state.mode == 'add' ? (
                    <div className="clearfix">
                        <div className="form-group col-sm-12">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="ID列表"/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={this.loadDataBy}>
                                    <span className="glyphicon glyphicon-refresh"></span>
                                </button>
                            </span>
                            </div>
                        </div>
                    </div>
                ) : null}
                {forms}
            </div>
        )
    }
}