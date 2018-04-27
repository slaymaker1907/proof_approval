import React, {Component} from 'react';
import {connect} from 'react-redux'
import Nav from './Nav';
import {Link, Route} from 'react-router-dom';
import '../Main.css'
import axios from 'axios'
import '../input.css' 
import { changeNewJobAction } from '../redux/reducers/job'

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            jobs: []
        }
    }

    componentDidMount(){
        this.get_jobs()
    }

    get_jobs = () => {
        console.log("loading")
        axios.get('http://localhost:8686/api/printing_job')
          .then(response => this.setState({ jobs: response.data})).then(console.log("job on state", this.state.jobs))
    }
  
    handleClick = () => {
        console.log("click me")
        axios.get(`http://localhost:8686/api/printing_job/`, { params: {job: 18} }).then(console.log(this.state.jobs[2].job_name))
        .then(() => this.props.history.push('job'))
    }
    
    render() {
        let jobs = this.state.jobs
        return (
            
            <div className="dashboard_contain" >
                <Nav />
                <div >
                    {jobs.map(job => <h4 className="dashboard_list"  key={job.job}onClick = {this.handleClick.bind(this)}>Job Number:{job.job} Name: {job.job_name}</h4> ) }
                    
                </div>
             
                <div className="button_contain">
                    <button className="input_button_sm"> <Link to={`/new/customer`}><h2>New Customer</h2></Link></button>
                    <button className="input_button_sm"><Link to={`/new/job`}><h2>New Job</h2></Link></button>
                </div>
            </div>
            
        )
    }
} 

function mapStateToProps(state) {
    const { job_name, substrate, qty, size, finishing, user_id, status, changes } = state.job;
    return { job_name, substrate, qty, size, finishing, user_id, status, changes, job: state.job}
}

const CHANGE_NEW_JOB = "CHANGE_NEW_JOB";

function mapDispatchToProps(dispatch) {
    return {
        update: (changes) => dispatch(changeNewJobAction(changes))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);







   // get_jobs = () => {
    //     console.log("loading")
    //     axios.get('http://localhost:8686/api/printing_job')
    //       .then(response => console.log(response.data , this.state.jobs))
    // }

      // get_job = () => {
    //     console.log("loading one")
    //     axios.get('http://localhost:8686/api/printing_job') 
    //       .then(response => this.setState({ jobs: response.data})).then(console.log("job on state", this.state.jobs))
    // }