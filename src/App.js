import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { extendObservable, computed } from 'mobx';
import { observer } from 'mobx-react';
import axios from 'axios';
import UserPage from './UserPage';
import './App.css';


class App extends Component {
	constructor(){
		super();
		extendObservable(this, {
                list: [],
                values: [],
                isOpen: false,
        });
        this.closeModal = this.closeModal.bind(this);
	}
	
    componentDidMount = () => {
        var th = this;
        this.serverRequest = 
          axios.get("https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc")
            .then(function(result) {    
              th.list= result.data.items;
        });
    }

    openModal(item_number) {
    	this.values = this.list[item_number];
        this.isOpen = true;        
    }

    closeModal(){
    	this.isOpen = false;
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
                <UserPage value={this.values} isOpen={this.isOpen} closeModal= {this.closeModal}/>        
            </div>
        );
   	}
}


export default observer(App);
