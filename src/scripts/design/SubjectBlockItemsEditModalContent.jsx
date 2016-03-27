'use strict'

import React, {PropTypes} from 'react'
import {render} from 'react-dom'
//import update from 'react/lib/update';
import {DropTarget} from 'react-dnd';
import SubjectBlockItemEditPlaceholder from './SubjectBlockItemEditPlaceholder.jsx'
import DndItemTypes from './DndItemTypes'

const placeholderTarget = {
    drop() {
    }
};
@DropTarget(DndItemTypes.SUBJECT_BLOCK_ITEM_EDIT_PLACEHOLDER, placeholderTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
export default class SubjectBlockItemsEditModalContent extends React.Component {
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
        //this.setState(update(this.state, {
        //    placeholders: {//FIXME
        //        $splice: [
        //            [index, 1],
        //            [atIndex, 0, placeholder]
        //        ]
        //    }
        //}));
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
        //this.setState(update(this.state, {
        //    placeholders: {//FIXME
        //        $splice: [
        //            [index, 1]
        //        ]
        //    }
        //}));
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