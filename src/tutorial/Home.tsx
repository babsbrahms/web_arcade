import React, { Component } from 'react';
import { TextInput } from "./TextInput";
import {AppContext} from "./AppContext"
import { Card } from "./Card"


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

    // static contextType = AppContext;
    // context: React.ContextType<typeof AppContext>;

    // changeType = () => {
    //     const { addVal } = this.context;

    // }

    render() {
        return (
                <div>
                    <h1>Home</h1>
                    <TextInput text="hello world" option="three" onSubmit={(e) => this.setState({ text: e.target.value })} />

                    <Card></Card>
                </div>
        )
    }
}
