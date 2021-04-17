import React, { Component, lazy, Suspense } from 'react';
import ErrorBoundary from "../container/ErrorBoundary"
const RoCkPaperScisors = lazy(() => import("../container/RockPaperScisors"))
const TicTacToe = lazy(() => import("../container/TicTacToe"))
const WhacAMole = lazy(() => import("../container/WhacAMole"))



export default class Home extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
