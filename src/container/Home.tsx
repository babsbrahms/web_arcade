import React, { Component } from 'react';
import { TextInput } from "./TextInput";


interface Person {

}

interface State {
    text: string,
    data?: Date,
    changes?: Array<{ text: string }>
    person?: Person
}

interface Props {

}


export default class Home extends Component <Props, State> {
    constructor (props: any) {
        super(props)
        this.state ={
            text: ""
        }
    }

    static defaultProps: Props = {

    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <TextInput text="hello world" option="three" onSubmit={(e) => this.setState({ text: e.target.value })} />
            </div>
        )
    }
}
