import React, { Component } from 'react';
import axios from 'axios';

class Tree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            factories: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/factories")
            .then(res => {
                const factories = res.data.data
                this.setState({factories});
            })
    }

    render() {
        return (
            <div>
            {this.state.factories.map(i => { return (
                <div>
                    FACTORY
                    <div>{i.name}   {i.childCount}   {i.randomLowerBound}    {i.randomUpperBound}</div>
                    {i.children.map(c => { return (
                        <div>{c}</div>
                    )})
                    }
                </div>
            )}
            )}
        </div>
        )
    }
}

export default Tree;

