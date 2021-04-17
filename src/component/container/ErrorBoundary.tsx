import React, { Component } from 'react'

interface State{
    hasError: boolean
}

interface Props{
    children: JSX.Element,
    msg: string
}
export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError () {
        this.setState({ hasError: true })
    }

    render() {
        const { hasError } = this.state;
        const { children, msg } = this.props;

        if (hasError) return <p> {msg}</p>
        return (
            <div>
                {children}
            </div>
        )
    }
}
