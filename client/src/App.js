import React, { Component } from 'react';
import './App.css';

const WhoIam = props => (
  <div>
    <h3>URL: {props.timestamp.ipadress}</h3>
    <h3>Language: {props.timestamp.language}</h3>
    <h3>Operating System: {props.timestamp.software}</h3>
    <h3>IP Address: {props.timestamp.ip}</h3>
  </div>
)


class App extends Component {
  // Initialize state
  constructor(props){
    super(props);

    this.state = { passwords: [] }

  }

  // Fetch passwords after first mount
  // componentDidMount() {
  //   this.getPasswords();
  
  // }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/whoiam')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  whoiamList(){
    return this.state.passwords.map(currentTime => {
      return <WhoIam timestamp={currentTime} key={currentTime.id} />
    })
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <tbody>
          {this.whoiamList()}
          </tbody>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>Click below to see your headers:</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Retrieve
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;