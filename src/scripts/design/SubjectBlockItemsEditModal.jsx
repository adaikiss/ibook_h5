'use strict'

import React from 'react'
import {render} from 'react-dom'
import FormModal from './FormModal.jsx'
import SubjectBlockItemsEditModalContent from './SubjectBlockItemsEditModalContent.jsx'

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