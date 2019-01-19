import React, { Component } from 'react';
import axios from 'axios';
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
        this.socket = io('localhost:8080');
        this.socket.on('REFRESH', function(){
            props.refresh();
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
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
        axios.delete("http://localhost:8080/api/factories/"+id)
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
        axios.patch("http://localhost:8080/api/factories/"+id, factory)
            .then(res => {
                this.socket.emit('NEW_CHANGE', {
                    message: "Update Factory"
                });
                this.props.refresh();
            })
    }

    generateChildren(id) {
        axios.put("http://localhost:8080/api/factories/"+id)
            .then(res => {
                this.socket.emit('NEW_CHANGE', {
                    message: "Factory Children Generated"
                });
                this.props.refresh();
            })
    }

    render() {
        return (
            <div>
            FACTORY
            <div>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                <input type="text" name="childCount" disabled value={this.state.childCount} onChange={this.handleChange} />
                <input type="text" name="randomLowerBound" value={this.state.randomLowerBound} onChange={this.handleChange} />
                <input type="text" name="randomUpperBound" value={this.state.randomUpperBound} onChange={this.handleChange} />
            </div>
            {this.state.children.map(c => { return (
                <div>{c}</div>
            )})
            }
            <button onClick={this.updateFactory.bind(this, this.state._id)}>Update</button>
            <button onClick={this.generateChildren.bind(this, this.state._id)}>Generate</button>
            <button onClick={this.deleteFactory.bind(this, this.state._id)}>Delete</button>
        </div>
        )
    }
}

export default Factory;