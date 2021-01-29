import React, { useState, useEffect } from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';


class Home extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            inputs: {
                subname: '',
                timeframeInput: 'hour'
            },
          errorMsg: ''
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    
    handleChange(event) {
        this.setState({
            inputs: Object.assign(
                {},
                this.state.inputs,
                {[event.target.name] : event.target.value}
            ),
            errorMsg: ''
        })
    }
    
    handleSubmit(event) {
        if (this.state.inputs.subname !== '' && 
            this.state.inputs.timeframeInput !== '') {
            this.props.history.push({
                pathname: '/comments',
                state: {subname: this.state.inputs.subname, 
                        timeframe: this.state.inputs.timeframeInput}})
        }
        else {
            this.setState({
                inputs: this.state.inputs, 
                errorMsg: 'Please enter valid subreddit and timeframe'
            });
        }
        event.preventDefault();
    }
  
    
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Subreddit Search</h1>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        Subreddit Name: &nbsp;
                        <input type="text" name='subname' value={this.state.subname} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        Select a timeframe for your top comments: &nbsp;
                        <select name='timeframeInput' value={this.state.timeframeInput} onChange={this.handleChange}>
                            <option value="hour">Now</option>
                            <option value="day">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                            <option value="all">All Time</option>
                        </select>
                    </label>
                    <p>{this.state.errorMsg}</p>
                    <br></br>
        
                    <input class="submit" type="submit" value="Submit" />
                    </form>
                </header>
            </div>
        );
    }

}

export default withRouter(Home);

