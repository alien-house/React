import React from 'react';
import { getDatabase, getIdToken } from '../../utils/FirebaseAuthService';
import * as firebase from "firebase";
import fetchJsonp from 'fetch-jsonp'
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import '../Main.css';
import ReactPaginate from 'react-paginate';

const JOBURL_INDEED = "http://api.indeed.com/ads/apisearch?publisher=2612264898312897";

export default class Jobs extends React.Component {
	constructor(){
		console.log("Jobs.constructor()");
		super();
		this.state = {
			jobdata: {
				results:[]
			},
			options:[],
			devStatus:{},
			maxPagerDispNum:0,
            currentPage:1,
			resultItemLength:10,
			data: [],
			offset: 0
		};
		// this.perPage = 10;
		var targetString = null;
		var url = "";
		// console.log("Jobs.getIdToken()"+getIdToken());
		this.logChange = this.logChange.bind(this);
		this.pageChange = this.pageChange.bind(this);

	}

	componentDidMount() {
		var that = this;
		// var urlid = "/" + firebase.auth().currentUser.uid;
		firebase.database().ref('devStatus').once('value').then(function(snapshot) {
			
			var obj = [];
			var objArray = snapshot.val().split(",");
			objArray.forEach(function(item, index){
				obj[index] = {value: item, label: item};
			});
			// console.log(obj);
			that.setState({ options: obj })

		});

		// getDatabase('devStatus',
		// 	(objDate) => { 
		// 		// console.log("==========^^============");
		// 		var obj = [];
		// 		var objArray = objDate.split(",");
		// 		objArray.forEach(function(item, index){
		// 			obj[index] = {value: item, label: item};
		// 		});
		// 		// console.log(obj);
		// 		this.setState({ options: obj })
		// 	}
		// );
		getDatabase('users',
			(objDate) => { 
				var objDevState = null;
				if(objDate != null){
					objDevState = objDate.devStatus;
				}
				// this.setState({ devStatus: objDate.devStatus })
				this.setState({
					devStatus: objDevState,
					jobsearch: objDevState
				});
				this.generateURL(objDevState);
			},
			getIdToken()
		);
     	// var userData = getUserProfile();
     	// getUserdata();
     	// console.log('userData::', userData);
		// getDatabase('devStatus',
		// 	(objDate) => { 
		// 		var obj = new Array();
		// 		console.log("======================");
		// 		var objArray = objDate.split(",");
		// 		objArray.forEach(function(item, index){
		// 			obj[index] = {value: item, label: item};
		// 		});
		//     console.log('devStatus::', obj)
		// 		this.setState({ options: obj })
		// 	}
		// );
		// fetchJsonp(url)
		//   .then(function(response) {
		//     return response.json()
		//   }).then(function(json) {
		//     that.setState({ jobdata: json });
		//   }).catch(function(ex) {
		//     console.log('parsing failed', ex)
		//   })

	}
	// componentDidMount(){
 //     	var userData = getUserProfile();
 //     	console.log('userData::', userData)
 //     	console.log('userData::', userDataFirebase)
	// }


	generateURL(devStatus = null, offset = 0){
		if(devStatus != null){
			console.log("@@とてる:");
			this.targetString = devStatus.replace(/\s+/g, "+").toLowerCase();
		}
		console.log("@@:"+this.targetString);
		// console.log("@@:"+offset);
		this.url = JOBURL_INDEED + '&q='+this.targetString+'&l=vancouver%2C+bc&sort=&radius=&st=&jt=&limit=&fromage=&filter=&latlong=1&co=ca&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0(Firefox)&v=2&format=json&start='+offset;
		console.log("indeedurl : " + this.url);
		this.getData(this.url);
	}
		
		
	logChange(val) {

		this.setState({
			options: this.state.options
		});

		var urls = "",words = "";
		val.map(function(data, i){
			words += data.value;
			if(i !== (val.length - 1)){ words += "+";}
		});
		urls += words;

		console.log("urls:"+urls);
		this.generateURL(urls, this.state.offset);

		this.setState({
			jobsearch: val
		});
	}

	pageChange(val) {

	    let selected = val.selected;
		console.log("Selected: " + selected);
		let offset = Math.ceil(selected * this.state.resultItemLength);
		console.log("offset: " + offset);
		
		if(isNaN(offset)){
			offset = 0;
		}
		this.generateURL(null, offset);
		console.log(offset + " + offset");
	}

	getData(url){
		var that = this;
		fetchJsonp(url)
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    // console.log("結果ながさ："+json.totalResults);
		
		    that.setState({ jobdata: json });
			that.setState({pageCount: Math.ceil(json.totalResults / that.state.resultItemLength)});
		  }).catch(function(ex) {
		    // console.log('parsing failed', ex)
		  })
	}

	render(selectProps) {
		const jobdata = this.state.jobdata;
		const maxNum = this.state.jobdata.totalResults;
		//     console.log('maxNum', maxNum)
		// this.setState({maxPagerDispNum:listNum});
		// console.log('jobdata', jobdata);
		// console.log('jobdatamaxNum', jobdata.results.length);

		// var jobdataLoadCheck = false;
		// if(jobdata){
		// 	jobdataLoadCheck = true;
		// }
		// const personLoc = Object.keys(jobdata.results).map((content, idx) => {
		// 	const items = jobdata.results[content].map((item, i) => (
		// 		<p key={i}>{item.jobtitle}</p>
		// 	))
		// 	return <div key={idx}>{items}</div>
		// })
  // 		var list = [];
		// for (var i = 0; i < listNum; i++) {
  //   		list.push(<li>{i}</li>);
		// }
	
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
					
					<div className="jobs-resultnum">{maxNum} results</div>
					<ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.pageChange}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
					<div className="jobs-box">
						{jobdatas}
					</div>
				</div>
			</div>
		);
	}
}
