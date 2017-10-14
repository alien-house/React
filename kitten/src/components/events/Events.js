import React from 'react';
import { getDatabase, getIdToken } from '../../utils/FirebaseAuthService';
import * as firebase from "firebase";
import fetchJsonp from 'fetch-jsonp'
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import '../Main.css';
import ReactPaginate from 'react-paginate';
import {eventConfig} from '../../utils/config';


export default class Events extends React.Component {
	constructor(){
		console.log("Events.constructor()");
		super();
		this.state = {
			eventsdata: []
		}
		var eventbritUrl = "";
	}

	componentDidMount() {
		this.generateURL("");
	}

	generateURL(devStatus = null, offset = 0){
		
		// console.log("@@:"+this.targetString);
		
		// this.url = JOBURL_INDEED + '&q='+this.targetString+'&l=vancouver%2C+bc&sort=&radius=&st=&jt=&limit=&fromage=&filter=&latlong=1&co=ca&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0(Firefox)&v=2&format=json&start='+offset;

        let url = "";
        let url_locationWithQuery = "&location.address=vancouver";
        let url_queryWithQuery = "&q=iOS";
        let url_expandWithQuery = "&expand=organizer,venue";
        let url_tokenWithQuery = "token=" + eventConfig.EVENTBRITE_TOKEN;

        //https://www.eventbriteapi.com/v3/events/search/?q=ios developer&location.address=vancouver,bc&token=CVKT5QQJUJYOJDWX2KNX
        this.url = eventConfig.EVENTBRITE_URL_BASE + eventConfig.EVENTBRITE_URL_API + url_tokenWithQuery + url_locationWithQuery + url_expandWithQuery + url_queryWithQuery;

		console.log("indeedurl : " + this.url);
		this.getData(this.url);
	}
		
	getData(url){
		var that = this;
		fetch(url)  
		.then(function(response) {
		  return response.json()
		}).then(function(json) {
			console.log("json.events");
			console.log(json.events);
			that.setState({ eventsdata: json.events });
			
		})

		// fetchJsonp(url)
		//   .then(function(response) {
		//     return response.json()
		//   }).then(function(json) {
		//     console.log("結果ながさ："+json);
		
		//     that.setState({ eventsdata: json });
		// 	// that.setState({pageCount: Math.ceil(json.totalResults / that.state.resultItemLength)});
		//   }).catch(function(ex) {
		//     // console.log('parsing failed', ex)
		//   })
	}

	render(selectProps) {
		
		const eventsdata = this.state.eventsdata;
		console.dir(eventsdata);
			const eventsdatas = eventsdata.map(function(data, i){
				return (
					<section key={i} className="unit">
					<a href={data.url} className="unit-anc" target="_blank">
						<figure className="img"><img src={data.logo.url} /></figure>
							
						<div>
							<p className="title">{data.name.text}</p>
							<p className="desc">{data.description.text}</p>
						</div>
						
						<time className="time">{data.start.local}</time>
					</a>
					</section>
				);
			})
		return (
			<div className="contents-wrap">
				<h1 className="contents-title">Events</h1>
					<div className="event-box">
						{eventsdatas}
					</div>
			</div>
		);
	}
}
