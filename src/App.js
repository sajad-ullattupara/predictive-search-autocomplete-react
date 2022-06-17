import React from 'react';
import countries from './data/Country';
import './App.css';

export default class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            suggestions: [],
            text: ''
        }
    }

    onTextChange = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = countries.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedCountry(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    Suggestion = () => {
        let { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul >
                { suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedCountry(item)}>{item}</li>)) }
            </ul>
        );
    }
    
    render() {
        const { text, suggestions } = this.state;
        return(
            <div className="box">
                <h2>Country List</h2>
                <input className="search" type="text" onChange={this.onTextChange} value={text}/>
                {this.Suggestion()}
                <span>box: {suggestions.length}</span>
            </div>
        );
    }

}
