'use strict'

import React from 'react'
import {render} from 'react-dom'
function handleValueChange(props, event){
    props.data[event.target.name] = event.target.value;
    props.handleValueChange();
}
export default function SubjectBlockForm(props){
    Utils.fallback(props.data, 'style', '2');
    Utils.fallback(props.data, 'dynamicField', '0');
    Utils.fallback(props.data, 'name', '');
    return (
        <form>
            <div className="clearfix">
                <div className="form-group col-sm-12">
                    <label>名称</label>
                    <input name="name" className="form-control" value={props.data.name} onChange={handleValueChange.bind(this, props)}/>
                </div>
            </div>
            <div className="clearfix">
                <div className="form-group col-sm-6">
                    <label>样式</label>
                    <select name="style" className="form-control" value={props.data.style} onChange={handleValueChange.bind(this, props)}>
                        {
                            ITEM_STYLES.map(function (item, index) {
                                return (<option value={item.id} key={index}>{item.name}</option>)
                            })
                        }
                    </select>
                </div>
                <div className="form-group col-sm-6">
                    <label>动态字段</label>
                    <select name="dynamicField" className="form-control" value={props.data.dynamicField} onChange={handleValueChange.bind(this, props)}>
                        {
                            DYNAMIC_TYPES.map(function (item, index) {
                                return (<option value={item.value} key={index}>{item.name}</option>)
                            })
                        }
                    </select>
                </div>
            </div>
        </form>
    );
}