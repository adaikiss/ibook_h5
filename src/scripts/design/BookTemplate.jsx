'use strict';
import React from 'react'
import {render} from 'react-dom'

export default class BookTemplate extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            mode:0,
            data:props.data
        };

    }

    render(){
        return (
            <div className="template book_template">
                {
                    <div className="template_render">
                        {
                            <div>{JSON.stringify(this.state.data)}</div>
                        }
                    </div>
                }
            </div>
        );
    }
}