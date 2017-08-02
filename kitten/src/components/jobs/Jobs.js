import React from 'react';
import { getDatabase, getIdToken } from '../../utils/FirebaseAuthService';
// import Pagination from '../../utils/Pagination';
import Pager from 'ts-react-pager';
import fetchJsonp from 'fetch-jsonp'
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import '../Main.css';

const JOBURL_INDEED = "http://api.indeed.com/ads/apisearch?publisher=2612264898312897";

export default class Jobs extends React.Component {
	constructor(){
		console.log("Jobs.constructor()");
		super();
		var num = 0;
		this.state = {
			jobdata: {
				results:[]
			},
			options:[],
			devStatus:{},
			maxPagerDispNum:0,
            currentPage:1
		};
		// console.log("Jobs.getIdToken()"+getIdToken());

		this.logChange = this.logChange.bind(this);

		getDatabase('devStatus',
			(objDate) => { 
				console.log("==========^^============");
				var obj = [];
				var objArray = objDate.split(",");
				objArray.forEach(function(item, index){
					obj[index] = {value: item, label: item};
				});
				console.log(obj);
				this.setState({ options: obj })
			}
		);
		getDatabase('users',
			(objDate) => { 
				console.log("======================");
				console.log(objDate);
				this.setState({ devStatus: objDate.devStatus })

		var TargetString = this.state.devStatus.replace(/\s+/g, "+").toLowerCase();
		console.log("@@:"+TargetString);
		var url = JOBURL_INDEED + '&q='+TargetString+'&l=vancouver%2C+bc&sort=&radius=&st=&jt=&limit=&fromage=&filter=&latlong=1&co=ca&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0(Firefox)&v=2&format=json&start=5';
		this.getData(url);
			},
			getIdToken()
		);
	}

	componentWillMount() {
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

	logChange(val) {
		console.log("Selected: " + JSON.stringify(val));
		this.setState({
			jobsearch: val,
			options: this.state.options
		});
		var url = JOBURL_INDEED + '&l=vancouver%2C+bc&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=ca&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0(Firefox)&v=2&format=json';
		var words = "";
		val.map(function(data, i){
			words += data.value;
			if(i !== (val.length - 1)){ words += "+";}
        	return data;
		});
		url += "&q=" + words;
		this.getData(url);
	}

	getData(url){
		var that = this;
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

	handlePaging(pageNum) {
		this.setState({data:this.state.jobdata.results, currentPage:pageNum})
	}

	setListNum(pageNum){

	}

	render(selectProps) {
		const jobdata = this.state.jobdata;
		const maxNum = this.state.jobdata.totalResults;
		const listNum = Math.ceil(maxNum / 10);
		//     console.log('maxNum', maxNum)
		// this.setState({maxPagerDispNum:listNum});
		console.log('jobdata', jobdata);
		console.log('jobdatamaxNum', jobdata.results.length);

		var o = {
		  dataLength:jobdata.results.length,  // Your data's length.
		  handler: this.handlePaging,         // Gets called when page is changed. You must implement your own. Otherwise crashes.
		  pageSize: listNum,      // Max page number to display.
		  maxPagerDispNum: 5,                 // (Optional) Max number of 'pager' to display. (default is 3)
		  currentPage: this.state.currentPage // Your current page should be set in your state.
		}
		const pager = () => {return (<Pager class="pagination" cobject={o} />)};
		console.log('pager::', pager);

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
					{pager}
					<div className="jobs-resultnum">{maxNum} results</div>
					<div className="jobs-box">
						{jobdatas}
					</div>
				</div>
			</div>
		);
	}
}
