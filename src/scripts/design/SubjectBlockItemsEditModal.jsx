'use strict'

import React, {PropTypes} from 'react'
import {render} from 'react-dom'
import {DragSource, DropTarget} from 'react-dnd';
import DndItemTypes from './DndItemTypes'
import FormModal from './FormModal.jsx'

export default class SubjectBlockItemsEditModal extends FormModal {
    constructor(props) {
        super(props);
    }

    open(){
        super.open();
        this.refs.content.decoratedComponentInstance.forceUpdate();
    }

    handleConfirm(){
        super.handleConfirm();
    }
    handleCancel(){
        super.handleCancel();
        STORE.subjectBlockItemsEditData.splice(0, STORE.subjectBlockItemsEditData.length);
    }
    render(){
        return super.render(<SubjectBlockItemsEditModalContent ref="content"/>);
    }
}

const contentPlaceholderTarget = {
    drop() {
    }
};
@DropTarget(DndItemTypes.SUBJECT_BLOCK_ITEM_EDIT_PLACEHOLDER, contentPlaceholderTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
class SubjectBlockItemsEditModalContent extends React.Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.movePlaceholder = this.movePlaceholder.bind(this);
        this.removePlaceholder = this.removePlaceholder.bind(this);
        this.findPlaceholder = this.findPlaceholder.bind(this);
        this.state = {placeholders: STORE.subjectBlockItemsEditData}
    }

    movePlaceholder(id, atIndex) {
        const { placeholder, index } = this.findPlaceholder(id);
        this.state.placeholders.splice(index, 1);
        this.state.placeholders.splice(atIndex, 0, placeholder);
        this.forceUpdate();
    }

    findPlaceholder(id) {
        const { placeholders } = this.state;
        const placeholder = placeholders.filter(p => p.id === id)[0];

        return {
            placeholder,
            index: placeholders.indexOf(placeholder)
        };
    }

    removePlaceholder(dragIndex, originalIndex) {
        const { placeholder, index } = this.findPlaceholder(dragIndex);
        this.state.placeholders.splice(index, 1);
        this.forceUpdate();
    }

    render() {
        const { connectDropTarget } = this.props;
        const { placeholders } = this.state;
        return connectDropTarget(
            <div className="subject-block-item-placeholder-container">
                {placeholders.map((item)=> {
                    return (
                        <SubjectBlockItemEditPlaceholder key={item.id}
                                                         id={item.id}
                                                         text={item.text}
                                                         movePlaceholder={this.movePlaceholder}
                                                         findPlaceholder={this.findPlaceholder}
                                                         removePlaceholder={this.removePlaceholder}/>)
                })}
            </div>)
    }
}

const placeholderSource = {
    beginDrag(props) {
        return {id: props.id,
            originalIndex: props.findPlaceholder(props.id).index};
    },
    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.removePlaceholder(droppedId, originalIndex);
        }
    }
};

const placeholderTarget = {
    canDrop() {
        return false;
    },
    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findPlaceholder(overId);
            props.movePlaceholder(draggedId, overIndex);
        }
    }
};

@DropTarget(DndItemTypes.SUBJECT_BLOCK_ITEM_EDIT_PLACEHOLDER, placeholderTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource(DndItemTypes.SUBJECT_BLOCK_ITEM_EDIT_PLACEHOLDER, placeholderSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
class SubjectBlockItemEditPlaceholder extends React.Component{
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        movePlaceholder: PropTypes.func.isRequired,
        findPlaceholder: PropTypes.func.isRequired,
        removePlaceholder: PropTypes.func.isRequired
    };
    render(){
        const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(<div style={{opacity}}>{text}</div>));
    }
}