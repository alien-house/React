import React from 'react';
// import DBnav from './DBNav';
// import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { updateUserProfile, /*getUserdata,*/ getUserProfile, getDatabase, updateDatabase, getStorage, updateStorage, updateStorageBase64 } from '../../utils/FirebaseAuthService';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import * as firebase from "firebase";
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
// import ReactSpinner from 'react-spinjs';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom'

export default class Setting extends React.Component {

	constructor(){
		super();
		this.handleChange = this.handleChange.bind(this);
		this.uploadCropImg = this.uploadCropImg.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleImgChange = this.handleImgChange.bind(this);
		// this.getOptions = this.getOptions.bind(this);
		this.selectChange = this.selectChange.bind(this);
		this.state = {
			userDate:{
				name:"",
				email:"",
				userImg:"",
				devStatus:"",
				photoURL:"",
				emailVerified:"",
				uid:"",
				bio:"",
				location:"",
				url:"",
				company:"",
				linkedin:"",
				twitter:"",
				github:"",
				facebook:"",
				dribbble:""
			},
			devStatus:"",
			userImg:"",
    		isShowingModal: false,
    		imgUrl:""
		};
		var userDate = {};
		var emailaddress = "";
	}
	
	componentWillMount(){
		var that = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				that.setState({ 
					userDate:{
						name : user.displayName,
						email : user.email,
						photoURL : user.photoURL,
						emailVerified : user.emailVerified,
						uid : user.uid
					}
				});
				that.emailaddress = that.state.userDate.email;
				if(that.state.userDate.photoURL != null){
					var imgPromise = getStorage(that.state.userDate.photoURL);
					imgPromise.then( value => {
						console.log("Success");
						that.setState({ 
							userImg: value 
						});
						
					}, reason => {
						console.log("Error"); // Error!
					});
				}
				let urlid = "users/" + user.uid;
				firebase.database().ref(urlid).once('value').then(function(snapshot) {
					var objDate = snapshot.val();
					console.log("==========getDatabase============");
					console.dir(objDate);
					// console.log(objDate.devStatus);
					const newState = {...that.state.userDate};
					newState['devStatus'] = objDate.devStatus;
					newState['bio'] = objDate.bio;
					newState['location'] = objDate.location;
					newState['url'] = objDate.url;
					newState['company'] = objDate.company;
					newState['linkedin'] = objDate.linkedin;
					newState['twitter'] = objDate.twitter;
					newState['github'] = objDate.github;
					newState['facebook'] = objDate.facebook;
					newState['dribbble'] = objDate.dribbble;
					that.setState({
						userDate : newState
					});

				});
			} else {
				// No user is signed in.
     			console.log("いませんよ〜");
			}
		  });
     	/* ================================ 
     	// get user data
		================================ */	
		//  var userData = getUserProfile();
		// this.state.userDate = userData;
		// console.log("objDate.devStatus~~~~~~~~~~~~~~~~~");
		// console.dir(userData);
		// if(userData){
		// 	console.log("photoURL:",this.state.userDate.photoURL);
		// 	this.emailaddress = userData.email;
		// 	if(this.state.userDate.photoURL != null){
		// 		var imgPromise = getStorage(this.state.userDate.photoURL);
		// 		imgPromise.then( value => {
		// 			console.log("Success"); // Success!
		// 			// var userDate = {
		// 			// 	email: email,
		// 			// 	userImg: value 
		// 			// }
		// 			this.setState({ 
		// 				userImg: value 
		// 			});
					
		// 		}, reason => {
		// 			console.log("Error"); // Error!
		// 		});
		// 	}
		// }
     	/* ================================ 
     	// select data retrieve
		================================ */	
		getDatabase('devStatus',
			(objDate) => {
				var obj = [];
				// console.log("======================");
				var objArray = objDate.split(",");
				objArray.forEach(function(item, index){
					obj[index] = {value: item, label: item};
				});
				this.setState({ options: obj })
			}
		);
     	/* ================================ 
     	// user data from database
		================================ */	
		// var user = firebase.auth().currentUser;
		// var urlid = "";
		// if (user != null) {
		// 	urlid = "users/" + user.uid;
		// 	firebase.database().ref(urlid).once('value').then(function(snapshot) {
		// 		var objDate = snapshot.val();
		// 		console.log("==========getDatabase============");
		// 		console.dir(objDate);
		// 		// console.log(objDate.devStatus);
		// 		that.setState({
		// 			userDate:{
		// 				devStatus: objDate.devStatus
		// 			}
		// 		});
		// 	});
		// }
	}

 	/* ================================ 
 	// modal
	================================ */	
	handleClick = () => this.setState({isShowingModal: true});
	handleClose = () => this.setState({isShowingModal: false});

	handleChange(event) {
    	const target = event.target;
    	const value = target.value;
		const name = target.name;
		const newState = {...this.state.userDate};
		newState[name] = value;
		// console.log(target);
		console.log(value);
		console.log(name + " : " + value);
		this.setState({
			userDate: newState
		});
	}
	selectChange(val) {
		console.log(val.value);
		const newState = {...this.state.userDate};
		newState['devStatus'] = val.value;
		this.setState({
			userDate: newState
		});
	}
	_crop(){
				// image in dataUrl
				// console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
	}

	uploadCropImg(event){
		var that = this;
		// console.dir(this.refs.cropper.getCroppedCanvas());
		let imgfile = this.refs.cropper.getCroppedCanvas().toDataURL();
		let imgbase64 = imgfile.split(',');
		console.dir(imgbase64[1]);
    	let userDate = {};
		updateStorageBase64(imgbase64[1], 'profile', function(metadata){
			console.dir(metadata);
			updateUserProfile(
			    userDate = {
			      photoURL : metadata.fullPath
			    });
				that.setState({isShowingModal: false});
		});
		getUserProfile();
	}

	handleImgChange(event){
		var files = event.target.files;
		// console.dir(files[0]);
		var that = this;
		this.setState({isShowingModal: true});
        if (files && files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
            	var img = document.getElementById('blah');
            	// img.setAttribute('src',e.target.result);
				that.setState({imgUrl: e.target.result});
                // $('#blah').attr('src', e.target.result);
            }
            reader.readAsDataURL(files[0]);
        }
	}

	handleSubmit(event) {
		// var name = this.state.userDate.name;
		// var email = this.state.userDate.email;
		// console.dir( "name:"+name);
		var userObj = {
		    displayName: this.state.userDate.name
		};
		// var devStatus = this.state.devStatus;
		var user = firebase.auth().currentUser;
		/* for this structure
		{
		  displayName: "Jane Q. User",
		  photoURL: "https://example.com/jane-q-user/profile.jpg"
		}
		*/
		// console.log("updateUserProfile---------------");
		// console.dir(user);
		if(user){
			user.updateProfile(userObj).then(function() {
			// Update successful.
				alert("has saved!");
			}, function(error) {
			// An error happened.
			});
			if(this.emailaddress != this.state.userDate.email){
				// console.dir( "this.state.userDate.email:"+this.state.userDate.email);
				user.updateEmail(this.state.userDate.email).then(function() {
					// Update successful.
				}).catch(function(error) {
					// An error happened.
				});
			}else{
				console.log("email is same");
			}
			console.log("bio:" + this.state.userDate.bio);
			
			let dataObj = {
				devStatus: this.state.userDate.devStatus,
				bio:this.state.userDate.bio,
				location:this.state.userDate.location,
				url:this.state.userDate.url,
				company:this.state.userDate.company,
				linkedin:this.state.userDate.linkedin,
				twitter:this.state.userDate.twitter,
				github:this.state.userDate.github,
				facebook:this.state.userDate.facebook,
				dribbble:this.state.userDate.dribbble
			};
			// updateDatabase(dataObj);
			firebase.database().ref('users/' + user.uid).set(dataObj);
		}
	}

	// getOptions(input, callback) {
	//   setTimeout(function() {
	//     callback(null, {
	//       options: [
	//         { value: 'one', label: 'One' },
	//         { value: 'two', label: 'Two' }
	//       ],
	//       // CAREFUL! Only set this to true when there are no more options,
	//       // or more specific queries will not be sent to the server.
	//       complete: true
	//     });
	//   }, 500);
	// }

	render() {
		// var options = [
		// 	{ value: 'one', label: 'One' },
		// 	{ value: 'two', label: 'Two' }
		// ];
		// console.log(options);
		// const { query } = this.props.location;
		// const { params } = this.props.match;
		// const { article } = params;
		// const { date, filter } = query;
		   // this.state.isAuthenticated? (
     //    <Route children={this.props.children} />
     //  ) : (
    	// 		<Redirect to={'/mypage'} />
     //  )
		return (
			<div>
				<h1 className="contents-title">Setting</h1>
				<div className="unit-card">
					<article>
						<h2>Profile</h2>
						<div className="setting-box">

							<div className="input-area">
								<dl className="dl">
									<dt>Name</dt>
									<dd><input type="text" name="name" value={this.state.userDate.name || ''} onChange={this.handleChange} /></dd>

									<dt>Your Role</dt>
									<dd><Select name="devStatus" value={this.state.userDate.devStatus || ''} options={this.state.options} onChange={this.selectChange} /></dd>
									
									<dt>E-mail</dt>
									<dd><input type="text" name="email" value={this.state.userDate.email || ''} onChange={this.handleChange} /></dd>
									<dt>Bio</dt>
									<dd><textarea name="bio" rows="4" cols="50" onChange={this.handleChange} value={this.state.userDate.bio || ''}></textarea></dd>
									<dt>Location</dt>
									<dd><input type="text" name="location" value={this.state.userDate.location || ''} onChange={this.handleChange} /></dd>
									<dt>URL</dt>
									<dd><input type="text" name="url" value={this.state.userDate.url || ''} onChange={this.handleChange} /></dd>
									<dt>Company</dt>
									<dd><input type="text" name="company" value={this.state.userDate.company || ''} onChange={this.handleChange} /></dd>
									<dt>Linkedin</dt>
									<dd><input type="text" name="linkedin" value={this.state.userDate.linkedin || ''} onChange={this.handleChange} /></dd>
									<dt>Twitter</dt>
									<dd><input type="text" name="twitter" value={this.state.userDate.twitter || ''} onChange={this.handleChange} /></dd>
									<dt>GitHub</dt>
									<dd><input type="text" name="github" value={this.state.userDate.github || ''} onChange={this.handleChange} /></dd>
									<dt>Facebook</dt>
									<dd><input type="text" name="facebook" value={this.state.userDate.facebook || ''} onChange={this.handleChange} /></dd>
									<dt>Dribbble</dt>
									<dd><input type="text" name="dribbble" value={this.state.userDate.dribbble || ''} onChange={this.handleChange} /></dd>
								</dl>
								<button id="btn-signIn" onClick={this.handleSubmit}>update</button>
							</div>

							<div className="pic-area">
								<img src={this.state.userImg} id="myimg" alt="de" />
								<input name="images" type="file" onChange={this.handleImgChange} />
								<div>
								{
								this.state.isShowingModal &&
								<ModalContainer onClose={this.handleClose}>
								  <ModalDialog className="md" onClose={this.handleClose}>
								    <h1>Uploding image</h1>
								    <p>Please trim your image, before upload.</p>
								    <Cropper
								    id="blah"
								    className="preview-img"
							        ref='cropper'
							        src={this.state.imgUrl}
							        // style={{height: 400, width: '100%'}}
							        // Cropper.js options
							        aspectRatio={2 / 2}
							        guides={false}
							        alt="your image"
							        crop={this._crop.bind(this)} />
							        <button onClick={this.uploadCropImg}>Crop &amp; Upload</button>
								  </ModalDialog>
								</ModalContainer>
								}
								</div>
 
							</div>
							
						</div>
					</article>
				</div>
			</div>
		);
	}
}
// const ModalWin = () => (
// )
/*
     <Cropper
        ref='cropper'
        src='https://avatars0.githubusercontent.com/u/760314?v=4&s=400'
        style={{height: 400, width: '100%'}}
        // Cropper.js options
        aspectRatio={16 / 9}
        guides={false}
        crop={this._crop.bind(this)} />



								<button id="btn-signIn" onClick={this.handleImgSubmit}>update</button>
*/
//https://stackoverflow.com/questions/41214447/firebase-user-uploads-and-profile-pictures

// const mapStateToProps = state => ({
// 	sessionId: state.sessionId
// });