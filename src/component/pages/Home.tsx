import React, { Component, lazy, Suspense } from 'react';
import { Card, Dropdown, Segment, Radio, DropdownProps } from 'semantic-ui-react';
import ErrorBoundary from "../container/ErrorBoundary"
import { GlobalContext, GlobalContextType } from "../../context/GlobalContext"
import { Alert} from "../container/Alert";
const RockPaperScissors = lazy(() => import("../Games/RockPaperScissors"));
const TicTacToe = lazy(() => import("../Games/TicTacToe"));
const WhacAMole = lazy(() => import("../Games/WhacAMole"));


interface Props {

}
type  Game  = | "" | "TIC-TAC-TOE" | "ROCK-PAPER-SCISSORS" | "WHAC-A-MOLE"
interface State {
    game: Game,
    name: string
}

const gameOption = [
    {  key: "TIC-TAC-TOE", value: "TIC-TAC-TOE", text: "TIC-TAC-TOE" },
    {  key: "ROCK-PAPER-SCISSORS", value: "ROCK-PAPER-SCISSORS", text: "ROCK-PAPER-SCISSORS" },
    {  key: "WHAC-A-MOLE", value: "WHAC-A-MOLE", text: "WHAC-A-MOLE" },

]

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
        const { theme } = this.context as GlobalContextType;
        
        return (
            <div style={{ width: "100%", height: "100%", backgroundColor: theme === "light"? "white" : "black" }}>
                <GlobalContext.Consumer>
                    {({ changeTheme }) => (
                    <>
                        <Segment id="game-dashboard" style={{ backgroundColor: theme === "light"? "white" : "black" }}>
                            <Card.Group itemsPerRow="2">
                                <Card>
                                    <Card.Content>
                                        <Card.Header>
                                            Game
                                        </Card.Header>
                                        <Card.Meta>
                                            <Dropdown
                                                placeholder='Select Game'
                                                fluid
                                                // search
                                                clearable
                                                selection
                                                value={game}
                                                options={gameOption}
                                                onChange={(e, data) => this.pickGame(data)}
                                            />

                                        </Card.Meta>
                                    </Card.Content>
                                </Card>

                                <Card>
                                    <Card.Content>
                                        <Segment secondary>
                                            <Radio type="radio" toggle value={theme} checked={(theme === "light")} onChange={() => changeTheme()} label={`${theme === "light" ? "dark" : "light"} theme`}/>
                                        </Segment>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
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
                                        <RockPaperScissors/>
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
