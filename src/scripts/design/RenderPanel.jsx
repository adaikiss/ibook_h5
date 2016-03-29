'use strict';
import React, {PropTypes} from 'react'
import {render} from 'react-dom'

import {DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DndItemTypes from './DndItemTypes'

import SubjectBlockTemplate from './SubjectBlockTemplate.jsx'
import SubjectBlock from '../components/fragments/SubjectBlock.jsx'

const getState = function () {
    return {subjectBlocks: STORE.subjectBlocks, books: STORE.books};
}
const subjectBlockTemplateTarget = {
    drop() {
    }
};

@DropTarget(DndItemTypes.SUBJECT_BLOCK_TEMPLATE, subjectBlockTemplateTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
export default class DesignPanel extends React.Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.moveTemplate = this.moveTemplate.bind(this);
        this.removeTemplate = this.removeTemplate.bind(this);
        this.findTemplate = this.findTemplate.bind(this);
        this.state = getState();
    }

    moveTemplate(id, atIndex) {
        const { template, index } = this.findTemplate(id);
        this.state.subjectBlocks.splice(index, 1);
        this.state.subjectBlocks.splice(atIndex, 0, template);
        this.forceUpdate();
    }

    findTemplate(id) {
        const templates  = this.state.subjectBlocks;
        const template = templates.filter(p => p.uuid === id)[0];

        return {
            template,
            index: templates.indexOf(template)
        };
    }

    removeTemplate(dragIndex, originalIndex) {
        const { index } = this.findTemplate(dragIndex);
        this.state.subjectBlocks.splice(index, 1);
        this.forceUpdate();
    }

    componentDidMount() {
        STORE.observe(this._onChange.bind(this));
    }

    _onChange() {
        this.forceUpdate();
    }

    render() {
        const { connectDropTarget } = this.props;
        return connectDropTarget(
            <div id="device-emulator" className="iPhone_6_Plus">
                {this.state.subjectBlocks.map(item => {
                    return (
                        <SubjectBlockTemplate key={item.uuid} data={item} id={item.uuid}
                                              moveTemplate={this.moveTemplate}
                                              findTemplate={this.findTemplate}
                                              removeTemplate={this.removeTemplate}/>
                    )
                })}
                <SubjectBlock data={{items:this.state.books.data, style:12}}/>
            </div>
        )
    }
}