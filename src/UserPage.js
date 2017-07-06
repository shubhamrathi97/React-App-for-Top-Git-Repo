import React, {Component} from 'react';
import Modal from 'react-modal';
import UserInfo from './UserInfo';

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

export default class UserPage extends Component {
	constructor(){
		super();
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
	}

    openModal(){
    	
    }

    closeModal() {
        this.modalIsOpen = false;
    }
	
	render(){
		console.log(this);
			this.modalIsOpen = this.props.isOpen;
		return(
			<Modal 
		        isOpen={this.modalIsOpen}
		        onAfterOpen={this.afterOpenModal}
		        onRequestClose={this.closeModal}
		        style={customStyles}
		        contentLabel="Information Modal"
		    >
		    	<UserInfo info = {this.props.value} />
                <button onClick={this.props.closeModal}>close</button>
	       	</Modal>
		);
	}
}