import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: "Waiting on transaction success..."
    });

    // gonna take ~15sec
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.init();

    this.setState({
      message: "You have been entered!"
    });
  };

  init = async () => {
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({
      players,
      balance
    });
  } 

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    
    this.setState({
      manager,
    });

    this.init();
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      message: "Waiting on transaction success..."
    });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({
      message: "A winner has been picked!"
    });

    this.init();
  }

  render() {
    // web3.eth.getAccounts().then(console.log);
    return (
      <div className="App">
        <header className="App-header">
          <h2>Lottery</h2>
          <small>Web3 version: {web3.version}</small>
          <p>This lottery is managed by {this.state.manager}</p><p>
            There are currently {this.state.players.length} people entered,
            competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
          </p>
        </header>
        <form onSubmit={this.onSubmit}>
          <h4>Wanna try your luck?</h4>

          {this.state.message ? (
            <div>
              <hr />
              <small>{this.state.message}</small>
              <hr />
            </div>
          ) : null}

          <div style={{display: 'inline-block'}}>
            <label>Amount of ether to enter </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button style={{display:'inline-block'}}>Enter</button>
        </form>

        <br />
        
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
      </div>
    );
  }
}

export default App;
