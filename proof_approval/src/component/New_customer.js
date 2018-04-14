import React, {Component} from 'react'
import {connect} from 'react-redux'
import '../Main.css'
import '../input.css'
import { changeNewUserAction } from '../redux/reducers/user'

class New_Customer extends Component {
    constructor() {
        super() 
    }

  


    render() {
        // console.log('this.props', this.props)
        return (
            <div className="input_contain">
                {/* <div onClick={this.state.} */}
                <input onChange={event => this.props.update({name: event.target.value})} placeholder="Name" className="input"/>
                <input onChange={event => this.props.update({password: event.target.value})} placeholder="Password" className="input"/>
                <input onChange={event => this.props.update({phone: event.target.value})} placeholder="Phone" className="input"/>
                <input onChange={event => this.props.update({email: event.target.value})} placeholder="Email" className="input"/>
                <input onChange={event => this.props.update({company: event.target.value})} placeholder="Company" className="input"/>
                <div className="radio">
                    <input
                        onChange={event=> this.props.update({admin: event.target.value === 'true'})}
                        type="radio"
                        name="admin"
                        value={false}
                        checked={!this.props.admin}
                    /> Customer
                    <input
                        onChange={event=> this.props.update({admin: event.target.value === 'true'})}
                        type="radio"
                        name="admin"
                        value={true}
                        checked={this.props.admin}
                    /> Admin
                </div>

                <button 
                    onClick={this.newUser}
                    className="input_button">Create New Customer
                 </button>
                <h1>{this.props.substrate}</h1>
            </div>
        )
    }

}

// flow of connect (how props is constructed)
// First you have input props initially (basic React props)
// Then, run mapStateToProps (state, inputProps) => new stuff to add to props.
// Finally, runDispatchToProps (dispatch, inputProps) => new stuff to add to props.

function mapStateToProps(state) {
    const { name, password, phone, email, company, admin } = state.user;
    const { substrate } = state.job;
    return { name, password, phone, email, company, admin, substrate }
}


const CHANGE_NEW_CUSTOMER = "CHANGE_NEW_CUSTOMER";

function mapDispatchToProps(dispatch) {
    return {
        update: (changes) => dispatch(changeNewUserAction(changes))
    };
}

// function mapStateToProps(state) {
//     const { substrate } = state.job;
//     return { substrate }
// }

export default connect(mapStateToProps, mapDispatchToProps)(New_Customer);