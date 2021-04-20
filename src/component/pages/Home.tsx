import React, { Component, lazy, Suspense } from 'react';
import { Card, Dropdown, Segment, Input, DropdownProps } from 'semantic-ui-react';
import ErrorBoundary from "../container/ErrorBoundary"
import { GlobalContext, GlobalContextType } from "../../context/GlobalContext"
import { Alert} from "../container/Alert";
const RockPaperScisors = lazy(() => import("../container/RockPaperScisors"))
const TicTacToe = lazy(() => import("../container/TicTacToe"))
const WhacAMole = lazy(() => import("../container/WhacAMole"))


interface Props {

}
type  Game  = | "" | "TIC-TAC-TOE" | "ROCK-PAPER-SCISSORS" | "WHAC-A-MOLE"
interface State {
    game: Game,
    name: string
}

export default class Home extends Component<Props, State> {
    constructor (props:Props) {
        super(props)

        this.state= {
           game: "",
           name: ""
        }
    }

    static contextType = GlobalContext;

    alertUserTheme = {
 
    }

    pickGame = ({ value }: DropdownProps) => {
        const { clearMessage } = this.context as GlobalContextType;

        clearMessage()

        this.setState({ game: value as Game })
    }

    addName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value })
    }
    render() {
        const { game, name } = this.state;
        
        return (
            <div>
                <GlobalContext.Consumer>
                    {({ username, addUsername }) => (
                    <>
                        <Segment>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        Username:  {username}
                                    </Card.Header>
                                    <Card.Meta>
                                        <Input fluid value={name} onChange={(e) => this.addName(e)} action={{ icon: 'send', onClick: () => addUsername(name), color: username? "green": "grey"  }} placeholder='add username' />
                                    </Card.Meta>
                                    <Card.Description>
                                        
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Header>
                                        Game
                                    </Card.Header>
                                    <Card.Meta>
                                        <Dropdown
                                            placeholder='Select Game'
                                            fluid
                                            search
                                            selection
                                            value={game}
                                            options={["TIC-TAC-TOE", "ROCK-PAPER-SCISSORS", "WHAC-A-MOLE"].map(x => ({  key: x, value: x, text: x }))}
                                            onChange={(e, data) => this.pickGame(data)}
                                        />

                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        </Segment>
                        <Alert />
                        <div>
                            {(game === "TIC-TAC-TOE") && (
                                <ErrorBoundary msg="Problem loading TIC-TAC-TOE">
                                    <Suspense fallback="Loading...">
                                        <TicTacToe />
                                    </Suspense>
                                </ErrorBoundary> 
                            )}

                            {(game === "ROCK-PAPER-SCISSORS") && (
                                <ErrorBoundary msg="Problem loading ROCK-PAPER-SCISSORS">
                                    <Suspense fallback="Loading...">
                                        <RockPaperScisors/>
                                    </Suspense>
                                </ErrorBoundary> 
                            )}  

                            {(game === "WHAC-A-MOLE") && (
                                <ErrorBoundary msg="Problem loading WHAC-A-MOLE">
                                    <Suspense fallback="Loading...">
                                        <WhacAMole />
                                    </Suspense>
                                </ErrorBoundary> 
                            )}
                        </div>
                    </>
                    )}
                </GlobalContext.Consumer>

            </div>
        )
    }
}
