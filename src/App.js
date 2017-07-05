import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { extendObservable, computed } from 'mobx';
import { observer } from 'mobx-react';
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
        extendObservable(this, {
                list: [],
                modalIsOpen: false,
                values: [],
        });
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal(values) {
        this.value =  values;
        this.modalIsOpen =  true;        
    }


    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
        this.values = this.list[this.value];
    }

    closeModal() {
        this.modalIsOpen = false;
    }


    componentDidMount = () => {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
        var th = this;
        this.serverRequest = 
          axios.get("https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc")
            .then(function(result) {    
              th.list= result.data.items;
            });
    }

  render() {
    return (
            <div>
                <ul>
                    {
                     this.list.map((item, key) => {
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
                    isOpen={this.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Information Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>{this.values.name}</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.values.name}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{this.values.description}</td>
                            </tr>
                            <tr>
                                <td>Git URL</td>
                                <td>{this.values.url}</td>
                            </tr>
                            <tr>
                                <td>Forks</td>
                                <td>{this.values.forks}</td>
                            </tr>
                            <tr>
                                <td>Watchers</td>
                                <td>{this.values.watchers}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        );
   }
}


export default observer(App);
