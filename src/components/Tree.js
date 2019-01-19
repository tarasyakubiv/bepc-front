import React, { Component } from 'react';
import Factory from "./Factory";
import NewFactory from "./NewFactory";
import axios from 'axios';

class Tree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            factories: []
        }
        this.refreshTree = this.refreshTree.bind(this)
    }

    componentDidMount() {
        this.refreshTree();
    }

    refreshTree() {
        axios.get("http://localhost:8080/api/factories")
            .then(res => {
                const factories = res.data.data
                this.setState({factories});
            })
    }

    render() {
        return (
            <div>
            <NewFactory refresh={this.refreshTree} />
            {this.state.factories.map(i => { return (
                <Factory factory={i} refresh={this.refreshTree} />
            )}
            )}
        </div>
        )
    }
}

export default Tree;

