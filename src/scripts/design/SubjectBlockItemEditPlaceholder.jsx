'use strict'

import React, { Component, PropTypes } from 'react'
import {render, findDOMNode} from 'react-dom'

import { DragSource, DropTarget } from 'react-dnd';
import DndItemTypes from './DndItemTypes'

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
export default class SubjectBlockItemEditPlaceholder extends React.Component{
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