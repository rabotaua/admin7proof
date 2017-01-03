import React, {Component} from "react"
import AppDispatcher from '../Dispatcher'
import CircularProgress from 'material-ui/CircularProgress';



export default class MainPage extends Component {

    constructor() {
        super();

        this.state = {
            pokemonsList: null
        }
    }

    getPockemons() {
        fetch('http://pokeapi.co/api/v2/pokemon/?limit=21')
            .then(response => response.json())
            .then(data => {
                AppDispatcher.dispatch({
                    actionType: 'GET_POKEMONS',
                    data
                })
            })
    }

    componentDidMount() {
        this.getPockemons();

        AppDispatcher.register(payload => {
            if (payload.actionType == 'GET_POKEMONS') {
                this.setState({pokemonsList: payload.data})
            }
        })
    }

    render() {

        const {pokemonsList} = this.state;

        return (
            <div style={{margin: "150px 100px"}}>
                { !pokemonsList
                    ? <div><CircularProgress /> <br/> FETCH POKEMONS LIST</div>
                    : <ol> { pokemonsList.results.map(pokemon => {
                        return <li key={pokemon.name}>{pokemon.name}</li>
                    }) } </ol>
                }
            </div>
        );
    }
}