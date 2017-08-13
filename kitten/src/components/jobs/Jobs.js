import React from 'react';
import { getDatabase, getIdToken } from '../../utils/FirebaseAuthService';
// import Pagination from '../../utils/Pagination';
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
		this.perPage = 10
		this.state = {
			jobdata: {
				results:[]
			},
			options:[],
			devStatus:{},
			maxPagerDispNum:0,
            currentPage:1,
			data: [],
			offset: 0
		};
		// console.log("Jobs.getIdToken()"+getIdToken());

		this.logChange = this.logChange.bind(this);

		getDatabase('devStatus',
			(objDate) => { 
				// console.log("==========^^============");
				var obj = [];
				var objArray = objDate.split(",");
				objArray.forEach(function(item, index){
					obj[index] = {value: item, label: item};
				});
				// console.log(obj);
				this.setState({ options: obj })
			}
		);
		getDatabase('users',
			(objDate) => { 
				// console.log("======================");
				// console.log(objDate);
				this.setState({ devStatus: objDate.devStatus })

		var TargetString = this.state.devStatus.replace(/\s+/g, "+").toLowerCase();
		// console.log("@@:"+TargetString);
		var url = JOBURL_INDEED + '&q='+TargetString+'&l=vancouver%2C+bc&sort=&radius=&st=&jt=&limit=&fromage=&filter=&latlong=1&co=ca&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0(Firefox)&v=2&format=json&start=0';
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
		// console.log("Selected: " + JSON.stringify(val));
		// console.log("this.perPage: " + this.perPage);
	    let selected = val.selected + 1;
	    let offset = Math.ceil(selected * this.perPage);
		this.setState({
			options: this.state.options
		});

		var TargetString = this.state.devStatus.replace(/\s+/g, "+").toLowerCase();
		var url = JOBURL_INDEED + '&q='+TargetString+'&l=vancouver%2C+bc&sort=&radius=&st=&jt=&limit=&fromage=&filter=&latlong=1&co=ca&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0(Firefox)&v=2&format=json&start='+offset;
		// var words = "";
		// val.map(function(data, i){
		// 	words += data.value;
		// 	if(i !== (val.length - 1)){ words += "+";}
  //       	return data;
		// });
		// url += "&q=" + words;
		this.getData(url);
	}

	getData(url){
		var that = this;
		fetchJsonp(url)
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    // console.log(json)
		    that.setState({ jobdata: json });
			that.setState({pageCount: Math.ceil(json.totalResults / json.results.length)});
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
					<div className="jobs-box">
						{jobdatas}
					</div>
					<ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.logChange}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
				</div>
			</div>
		);
	}
}
