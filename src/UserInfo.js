import React, {Component} from 'react';

export default class UserInfo extends Component{
	render(){
		return (
		    <div>
			    <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.info.name}</h2>
			   	<table>
			    	<tbody>
			        	<tr>
			        	    <td>Name</td>
			                <td>{this.props.info.name}</td>
			            </tr>
			            <tr>
			                <td>Description</td>
			                <td>{this.props.info.description}</td>
			            </tr>
			            <tr>
			            	<td>Git URL</td>
			                <td>{this.props.info.url}</td>
			            </tr>
			            <tr>
			                <td>Forks</td>
			                <td>{this.props.info.forks}</td>
			            </tr>
			            <tr>
			                <td>Watchers</td>
			                <td>{this.props.info.watchers}</td>
			            </tr>
			        </tbody>
			    </table>
		    </div>
		);
	}
}