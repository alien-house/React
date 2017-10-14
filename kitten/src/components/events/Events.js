import React from 'react';
import { getDatabase, getIdToken } from '../../utils/FirebaseAuthService';
import * as firebase from "firebase";
import fetchJsonp from 'fetch-jsonp'
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import '../Main.css';
import ReactPaginate from 'react-paginate';
import {eventConfig,meetupConfig} from '../../utils/config';

export default class Events extends React.Component {
	constructor(){
		console.log("Events.constructor()");
		super();
		this.state = {
			eventsdata: []
		}
		var eventbritUrl = "";
		let eventList = [];
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
		console.log("eventURL : " + this.url);


		// https://api.meetup.com/find/events?upcoming_events=true&photo-host=public&page=20&text=iOS+Developer&sig_id=196968326&sig=caaafeee55fdc0128c313cd4c0d41ef212377003
		let meetupURL = "";
		let meetupURL_queryWithQuery = "&text=web";
		let meetupURL_locationWithQuery = "&location=vancouver";
		meetupURL = meetupConfig.MEETUP_URL_BASE + meetupConfig.MEETUP_URL_API + "upcoming_events=true&photo-host=public" +
		meetupURL_locationWithQuery + "&page=20&fields=group_key_photo" + meetupURL_queryWithQuery +
		meetupConfig.MEETUP_URL_SIGN;

		this.getData(this.url, meetupURL);
	}
		
	getData(url, meetupURL){
		let that = this;
		Promise.all([this.getMeetupdata(meetupURL), this.getEventsdata(url)]).then(function(){
			console.log("FInished!!");
			console.log(that.state.eventsdata);
		  });
	}

	getMeetupdata(url){
		let that = this;
		
		return fetchJsonp(url)  
		.then(function(response) {
		  return response.json()
		}).then(function(json) {
			console.log("getMeetupdata");
			console.log(that.eventList);
			// let ev = json.data.map(function(element) {
			// 	let photolink = (element.group.length) ? element.group.key_photo.photo_link:'';
			// 	return new Event(element.name, element.time, element.description, photolink, element.link)
			// })
			json.data.forEach(function(element) {
				console.log(element);
				let photolink = (element.group.length) ? element.group.key_photo.photo_link:'';
				console.log("photolink::"+photolink);
				let ev = new Event(element.name, element.time, element.description, photolink, element.link);
				that.pushIntoArray(ev);
				// this.eventList.push(ev);
			});
			
			return "finished";

			// return json.data;
			// that.setState({ eventsdata: json.events });
		})
	}
	getEventsdata(url){
		let that = this;
		return fetch(url)  
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			// console.log("json.events");
			// console.log(json.events);
			// let ev = json.events.map(function(element) {
			// 	let photolink = (element.logo.length) ? element.logo.url:'';
			// 	return new Event(element.name.text, element.start.local, element.description.text, photolink, element.url)
			// })
			// that.pushIntoArray(ev);

			json.events.forEach(function(element) {
				console.log(element);
				let photolink = (element.logo.length) ? element.logo.url:'';
				let ev = new Event(element.name.text, element.start.local, element.description.text, photolink, element.url);
				that.pushIntoArray(ev);
				// this.eventList.push(ev);
			});
			return "finished";
			// return json.events;
			// that.setState({ eventsdata: json.events });
		})
	}

	pushIntoArray(event){
		let arr = this.state.eventsdata.slice();
		arr.push(event);
		console.log("arr");
		console.log(arr);
		this.setState({eventsdata:arr});
		// this.eventList.push(event);
	}

	getShortDesc(fulltxt){
		if(fulltxt != undefined){
			let str = fulltxt.slice(0, 150) + "...";
			return str;
		}else{
			return fulltxt;
		}
	}
	setTimeFormat(timetxt){
		let date = new Date(timetxt);
		var options = {  
			weekday: "long", year: "numeric", month: "short",  
			day: "numeric", hour: "2-digit", minute: "2-digit"  
		};  
		return date.toLocaleTimeString("en-us", options).toString();
		// return date.toString();
	}

	render(selectProps) {
		
		const eventsdata = this.state.eventsdata;
		let that = this;
		console.dir(eventsdata);
		const eventsdatas = eventsdata.map(function(data, i){
			return (
				<section key={i} className="unit unit--events">
				
				<a href={data.link} className="unit-anc" target="_blank">
					<figure className="img"><img src={data.imgURL} /></figure>
						
					<div className="unit-desc">
						<time className="time">{that.setTimeFormat(data.date)}</time>
						<p className="title">{data.name}</p>
						<p className="desc">{that.getShortDesc(data.desc)}</p>
					</div>
					
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

// {eventsdatas}

class Event{
    constructor(name, date, desc, imgURL = null, link){
		this.name = name;
		this.date = date;
		this.desc = desc;
		this.imgURL = imgURL;
		this.link = link;
	}
}


