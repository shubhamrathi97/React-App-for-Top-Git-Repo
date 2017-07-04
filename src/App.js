import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios'
import './App.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {
    
    constructor() {
        super();
        this.state = {list: [], modalIsOpen: false, values: []};
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal(values) {
        this.setState({value: values});
        this.setState({modalIsOpen: true});        
    }


    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
        this.setState({values: this.state.list[this.state.value] });
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }


    componentDidMount = () => {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
        var th = this;
        this.serverRequest = 
          axios.get("https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc")
            .then(function(result) {    
              th.setState({
                list: result.data.items
              });
            });
    }

  render() {
    return (
            <div>
                <ul>
                    {
                        this.state.list.map((item, key) => {
                            return (
                                    <div className="card" key={item.id}>
                                        <img src={item.owner.avatar_url} alt={item.name} width="250px" height="200px"/>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <button onClick={()=>this.openModal(key)}> Open</button>
                                    </div>
                            )
                        })
                    }
                </ul>
                <Modal 
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Information Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.values.name}</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.values.name}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{this.state.values.description}</td>
                            </tr>
                            <tr>
                                <td>Git URL</td>
                                <td>{this.state.values.url}</td>
                            </tr>
                            <tr>
                                <td>Forks</td>
                                <td>{this.state.values.forks}</td>
                            </tr>
                            <tr>
                                <td>Watchers</td>
                                <td>{this.state.values.watchers}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        );
   }
}


/**const ListGit = ({}) => {
   return (
      <div>
          <Get url="https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc">
            {
                (error, response, isLoading) => {
                    if(error){
                        return (<h4>Something Went Wrong ! {error.message}</h4>)
                    }
                    else if(isLoading){
                        return (<h4>Loading, Please wait </h4>)
                    }
                    else if(response != null){
                        const git_response = response;
                        return (
                            <div>
                                <h1>{this.state.list.total_count}</h1>
                                <ul>
                                    {
                                        this.state.list.items.map((item, key) => {
                                            return (<div key={key} className="card">
                                                        <img src={item.owner.avatar_url} alt={item.name} width="250px" height="200px"/>
                                                        <h3>{item.name}</h3>
                                                        <p>{item.description}</p>
                                                        <button className="btn" >Know More</button>
                                                    </div>)
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }

                    return (<h1>Not Working</h1>)
                }
            }
           </Get>
       </div>
    );
}

**/
export default App;
