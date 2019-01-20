import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import io from "socket.io-client";

class Factory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.factory._id,
            name: this.props.factory.name,
            childCount: this.props.factory.childCount,
            randomLowerBound: this.props.factory.randomLowerBound,
            randomUpperBound: this.props.factory.randomUpperBound,
            children: this.props.factory.children
        }
        this.handleChange = this.handleChange.bind(this);
        this.socket = io(process.env.REACT_APP_SOCKET_HOST);
        this.socket.on('REFRESH', function(){
            props.refresh();
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.factory !== prevProps.factory) {
            this.setState({
                _id: this.props.factory._id,
                name: this.props.factory.name,
                childCount: this.props.factory.childCount,
                randomLowerBound: this.props.factory.randomLowerBound,
                randomUpperBound: this.props.factory.randomUpperBound,
                children: this.props.factory.children
            })
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value
        this.setState({[name]: value});
    }

    deleteFactory(id) {
        axios.delete(process.env.REACT_APP_API_HOST + "/" + id)
            .then(res => {
                this.socket.emit('NEW_CHANGE', {
                    message: "Delete Factory"
                });
                this.props.refresh();
            })
    }

    updateFactory(id) {
        let factory = {
            name: this.state.name,
            childCount: Number(this.state.childCount),
            randomLowerBound: Number(this.state.randomLowerBound),
            randomUpperBound: Number(this.state.randomUpperBound)
        }
        axios.patch(process.env.REACT_APP_API_HOST + "/"+id, factory)
            .then(res => {
                this.socket.emit('NEW_CHANGE', {
                    message: "Update Factory"
                });
                this.props.refresh();
            })
    }

    generateChildren(id) {
        axios.put(process.env.REACT_APP_API_HOST + "/"+ id)
            .then(res => {
                this.socket.emit('NEW_CHANGE', {
                    message: "Factory Children Generated"
                });
                this.props.refresh();
            })
    }

    render() {
        return (
            <div class="factory-container">
                <div class="factory-line"><hr/></div>
                <div class="factory-content">
                    <div class="factory-content-section">
                        <FontAwesomeIcon title="Save changes" onClick={this.updateFactory.bind(this, this.state._id)} 
                                    className="fa-button" icon="edit" />
                        <input type="text" title="Factory name" placeholder="Name" name="name" class="factory-name" value={this.state.name} onChange={this.handleChange} />
                        <FontAwesomeIcon title="Remove" onClick={this.deleteFactory.bind(this, this.state._id)} className="fa-button" icon="ban" />
                    </div>
                    <div class="factory-content-section">
                        <div class="factory-content-bottom">
                            <div>Children</div>
                            <div title="Child nodes count, locked">{this.state.childCount}</div>
                            <div><FontAwesomeIcon title="Re-generate" onClick={this.generateChildren.bind(this, this.state._id)} className="fa-button" icon="sync" /></div>
                        </div>
                        <div class="factory-content-bottom">
                            <div>Bounds</div>
                            <div><input type="text" placeholder="Upper random bound" title="Upper random number bound" name="randomUpperBound" class="factory-bound" value={this.state.randomUpperBound} onChange={this.handleChange} /></div>
                            <div><input type="text" placeholder="Lower random bound" title="Lower random number bound" name="randomLowerBound" class="factory-bound" value={this.state.randomLowerBound} onChange={this.handleChange} /></div>
                        </div>
                    </div>
                </div>
                <div class="factory-line"><hr/></div>
                <div class="factory-children">
                    {this.state.children.map(c => { return (
                        <div class="child-container">
                            <div class="child-line"><hr/></div>
                            <div class="child">{c}</div>
                        </div>
                    )})
                    }
                </div>
            </div>
        )
    }
}

export default Factory;