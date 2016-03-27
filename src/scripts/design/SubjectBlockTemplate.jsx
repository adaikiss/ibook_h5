'use strict';
import React, {PropTypes} from 'react'
import {render} from 'react-dom'
import SubjectBlock from '../components/fragments/SubjectBlock.jsx'
import {BootstrapButton} from './Bootstrap.jsx'
import { DragSource, DropTarget } from 'react-dnd';
import DndItemTypes from './DndItemTypes'

const templateSource = {
    beginDrag(props) {
        return {id: props.id,
            originalIndex: props.findTemplate(props.id).index};
    },
    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.removeTemplate(droppedId, originalIndex);
        }
    }
};

const templateTarget = {
    canDrop() {
        return false;
    },
    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findTemplate(overId);
            props.moveTemplate(draggedId, overIndex);
        }
    }
};

@DropTarget(DndItemTypes.SUBJECT_BLOCK_TEMPLATE, templateTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource(DndItemTypes.SUBJECT_BLOCK_TEMPLATE, templateSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class SubjectBlockTemplate extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        moveTemplate: PropTypes.func.isRequired,
        findTemplate: PropTypes.func.isRequired,
        removeTemplate: PropTypes.func.isRequired
    };
    constructor(props, context) {
        super(props, context);
        this.state = props.data;
    }

    edit() {
        STORE.editSubjectBlock(this.state);
        //this.props.editHelper.editSubjectBlock(this.state.data);
    }

    addItem(){
        STORE.addSubjectBlockItem(this.state.data);
    }
    addItems(){
        STORE.addSubjectBlockItems(this.state.data);
    }
    editItems(){
        STORE.editSubjectBlockItems(this.state.data);
    }
    //editItemCallback(data, isAdd){
    //    if(isAdd){
    //        this.state.data.data.items = this.state.data.data.items.concat(data);
    //    }
    //    this.forceUpdate();
    //}
    handleItemClick(itemIndex, event){
        STORE.editSubjectBlockItem(this.state.data, this.state.data.items[itemIndex])
    }
    remove(){
        STORE.removeSubjectBlock(this.state);
    }
    render() {
        const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(
            <div className="template subject_block_template" style={{opacity}}>
                <div className="template_toolbar">
                    <div className="btn-group">
                        <BootstrapButton title="调整内容" className="btn btn-default" onClick={this.editItems.bind(this)}><span className="glyphicon glyphicon-sort"/></BootstrapButton>
                        <BootstrapButton title="通过ID加载内容" className="btn btn-default" onClick={this.addItems.bind(this)}><span className="glyphicon glyphicon-list-alt"/></BootstrapButton>
                        <BootstrapButton title="添加单个内容" className="btn btn-default" onClick={this.addItem.bind(this)}><span className="glyphicon glyphicon-plus"/></BootstrapButton>
                        <BootstrapButton title="修改样式块" className="btn btn-default" onClick={this.edit.bind(this)}><span className="glyphicon glyphicon-cog"/></BootstrapButton>
                        <BootstrapButton title="删除样式块" className="btn btn-default" onClick={this.remove.bind(this)}><span className="glyphicon glyphicon-trash"/></BootstrapButton>
                    </div>
                </div>
                {this.state.data.items.length == 0 ? (
                    <div className="template_render"></div>
                ) : (
                    <SubjectBlock data={this.state.data} onClick={this.handleItemClick.bind(this)}/>
                )
                }
            </div>
        ));
    }
}