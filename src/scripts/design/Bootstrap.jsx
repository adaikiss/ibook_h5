'use strict'

import React from 'react'
import {render} from 'react-dom'

/**
 * Borrowed from https://github.com/facebook/react/blob/master/examples/jquery-bootstrap/js/app.js
 */
class BootstrapModal extends React.Component{
    // The following two methods are the only places we need to
    // integrate Bootstrap or jQuery with the components lifecycle methods.
    componentDidMount() {
        // When the component is added, turn it into a modal
        $(this.refs.root).modal({backdrop: 'static', keyboard: false, show: false});

        // Bootstrap's modal class exposes a few events for hooking into modal
        // functionality. Lets hook into one of them:
        $(this.refs.root).on('hidden.bs.modal', this.handleHidden);
    }
    componentWillUnmount() {
        $(this.refs.root).off('hidden.bs.modal', this.handleHidden);
    }
    close() {
        $(this.refs.root).modal('hide');
        return this;
    }
    open() {
        $(this.refs.root).modal('show');
        return this;
    }
    root(){
        return $(this.refs.root);
    }
    render(children) {
        var confirmButton = null;
        var cancelButton = null;

        if (this.props.confirm) {
            confirmButton = (
                <BootstrapButton
                    onClick={this.handleConfirm.bind(this)}
                    className="btn-primary">
                    {this.props.confirm}
                </BootstrapButton>
            );
        }
        if (this.props.cancel) {
            cancelButton = (
                <BootstrapButton onClick={this.handleCancel.bind(this)} className="btn-default">
                    {this.props.cancel}
                </BootstrapButton>
            );
        }

        return (
            <div className="modal fade" ref="root">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                onClick={this.handleCancel.bind(this)}>
                                &times;
                            </button>
                            <h3>{this.props.title}</h3>
                        </div>
                        <div className="modal-body">
                            {children}
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            {cancelButton}
                            {confirmButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }
    handleConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }
    handleHidden() {
        if (this.props.onHidden) {
            this.props.onHidden();
        }
    }
}
class BootstrapButton  extends React.Component{
    render() {
        return (
            <a {...this.props}
                href="javascript:;"
                role="button"
                className={(this.props.className || '') + ' btn'} />
        );
    }
}
export {BootstrapButton}
export {BootstrapModal}