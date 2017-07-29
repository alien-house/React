import React from 'react';
import { login, isAuthenticated } from '../../utils/FirebaseAuthService';
import { CSSTransitionGroup } from 'react-transition-group'
import axios from 'axios'
import fetchJsonp from 'fetch-jsonp'
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import '../Main.css';

const JOBURL_INDEED = "http://api.indeed.com/ads/apisearch?publisher=2612264898312897";

export default class Index extends React.Component {
	constructor(){
		super();
		this.state = {
			jobdata: {
				results:[]
			}
		};
		this.logChange = this.logChange.bind(this);
	}
	componentWillMount() {
		console.log("IndexIndexIndex");
		var that = this;
		var url = JOBURL_INDEED + '&q=front+end+developer&l=vancouver%2C+bc&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=ca&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0(Firefox)&v=2&format=json'
		fetchJsonp(url)
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    console.log(json)
		    that.setState({ jobdata: json });
		  }).catch(function(ex) {
		    console.log('parsing failed', ex)
		  })
	}
	logChange(val) {
	  console.log("Selected: " + JSON.stringify(val));
	  console.log(val.value);
		this.setState({
			jobsearch: val,
			options:val
		});
	}

	render(selectProps) {
		const jobdata = this.state.jobdata;
		var jobdataLoadCheck = false;
		if(jobdata){
			jobdataLoadCheck = true;
		}
		// const personLoc = Object.keys(jobdata.results).map((content, idx) => {
		// 	const items = jobdata.results[content].map((item, i) => (
		// 		<p key={i}>{item.jobtitle}</p>
		// 	))
		// 	return <div key={idx}>{items}</div>
		// })

		const jobdatas = jobdata.results.map(function(data, i){
	      return (
	      	<section key={i} className="unit">
		      	<a href={data.url} className="unit-anc" target="_blank">
		      		<h1 className="job-title">{data.jobtitle}</h1>
		      		<p className="job-company">{data.company}</p>
		      		<p className="job-desc" dangerouslySetInnerHTML={ {__html: data.snippet} }></p>
		      		<ul className="job-utillist">
		      			<li>{data.formattedLocation}</li>
		      			<li>{data.formattedRelativeTime}</li>
		      		</ul>
	      		</a>
	      	</section>
	      );
		})

		return (
			<div className="contents-wrap">
				<h1 className="contents-title">Jobs</h1>
				<Creatable
					name="jobsearch"
					value={this.state.jobsearch}
					multi={true}
					options={this.state.options}
					onChange={this.logChange}
					{...selectProps} />
				<div className="jobs">
					<div className="jobs-resultnum">{this.state.jobdata.totalResults} results</div>
					<div className="jobs-box">
						{jobdatas}
					</div>
				</div>
			</div>
		);
	}
}


// <CSSTransitionGroup
// transitionName="fade"
// transitionEnterTimeout={300}
// transitionLeaveTimeout={300}
// >
// </CSSTransitionGroup>
// <Route path="/register" name="register" component={Register}/>
// 								<Route path="/signin" name="signin" component={SignIn}/>