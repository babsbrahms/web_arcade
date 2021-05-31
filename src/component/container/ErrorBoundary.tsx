import * as React from 'react';

interface State{
    hasError: boolean
}

interface Props{
    children: JSX.Element,
    msg: string
}
interface Error {
    stack?: string;
}
export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError (error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log("Uncaught error", error, errorInfo);
    }
    
    render() {
        const { hasError } = this.state;
        const { children, msg = "Error" } = this.props;

        if (hasError) return <p> {msg}</p>
        return (
            <div>
                {children}
            </div>
        )
    }
}
