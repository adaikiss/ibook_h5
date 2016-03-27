import React from 'react'
import {render} from 'react-dom'

export class ModalContent extends React.Component {
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
            case 5:
                itemData.map((item, index) => forms.push(<LinkTagForm data={item} handleValueChange={this.handleValueChange.bind(this)} key={index}/>));
                break;
        }
        return (
            <div className="template_form">
                {this.state.mode == 'add' ? (
                    <div className="clearfix">
                        <div className="form-group col-sm-6">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="ID列表"/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button">
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