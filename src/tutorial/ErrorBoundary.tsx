import React, { Component } from 'react'

interface State {
    hasError: boolean
}
export default class ErrorBoundary extends Component<{ children: JSX.Element | null },State> {
    state:State = {
        hasError: false
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }
    
    //   componentDidCatch(error, errorInfo) {
    //     // You can also log the error to an error reporting service
    //     logErrorToMyService(error, errorInfo);
    //   }
    

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            return <p>Error loadng component</p>
        }
        return (
            <div>
                {children}
            </div>
        )
    }
}
