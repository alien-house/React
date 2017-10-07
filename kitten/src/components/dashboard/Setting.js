import React from 'react';
// import DBnav from './DBNav';
// import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { updateUserProfile, /*getUserdata,*/ getUserProfile, getDatabase, updateDatabase, getStorage, updateStorage, updateStorageBase64 } from '../../utils/FirebaseAuthService';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
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
		this.logChange = this.logChange.bind(this);
		this.state = {
			userDate:{
				userImg:""
			},
			userImg:"",
    		isShowingModal: false,
    		imgUrl:""
		};
	}
	
	componentWillMount(){
     	/* ================================ 
     	// get user data
		================================ */	
     	var userData = getUserProfile();
     	// console.log(userData);
		this.state.userDate = userData;
		console.log("objDate.devStatus~~~~~~~~~~~~~~~~~");
		console.dir(userData);
		if(userData){
			console.log("photoURL:",this.state.userDate.photoURL);
			if(this.state.userDate.photoURL != null){
				var imgPromise = getStorage(this.state.userDate.photoURL);
				imgPromise.then( value => {
					console.log("Success"); // Success!
					this.setState({ userImg: value });
					
				}, reason => {
					console.log("Error"); // Error!
				});
			}
		}
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
		getDatabase('users',
			(objDate) => { 
				// console.log("==========^^============");
				// console.dir(objDate);
				// console.log(objDate.devStatus);
				this.setState({
					devStatus: objDate.devStatus
				});
			}
		);
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
		console.log(target);
		// console.log(value);
		console.log(name);
		this.setState({
			[name]: value
		});
	}

	uploadCropImg(event){
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
			this.setState({isShowingModal: false});
		});
		getUserProfile();
	}

	_crop(){
		// image in dataUrl
		// console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
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
		var name = this.state.name;
		var email = this.state.email;
		var userObj = {
		    displayName: name,
		    email: email
		};
		var devStatus = this.state.devStatus;
		updateUserProfile(userObj);

		var dataObj = {
		    devStatus: devStatus
		};
		updateDatabase(dataObj);
	}
	logChange(val) {
		this.setState({
			devStatus: val.value
		});
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
									<dd><input type="text" name="name" value={this.state.name || ''} onChange={this.handleChange} /></dd>
									<dt>Your Role</dt>
									<dd><Select name="devStatus" value={this.state.devStatus || ''} options={this.state.options} onChange={this.logChange} /></dd>
									<dt>E-mail</dt>
									<dd><input type="text" name="email" value={this.state.email || ''} onChange={this.handleChange} /></dd>
									<dt>Bio</dt>
									<dd><textarea name="bio" rows="4" cols="50" onChange={this.handleChange} value={this.state.bio || ''}></textarea></dd>
									<dt>Location</dt>
									<dd><input type="text" name="location" value={this.state.location || ''} onChange={this.handleChange} /></dd>
									<dt>URL</dt>
									<dd><input type="text" name="url" value={this.state.url || ''} onChange={this.handleChange} /></dd>
									<dt>Company</dt>
									<dd><input type="text" name="company" value={this.state.company || ''} onChange={this.handleChange} /></dd>
									<dt>Linkedin</dt>
									<dd><input type="text" name="linkedin" value={this.state.linkedin || ''} onChange={this.handleChange} /></dd>
									<dt>Twitter</dt>
									<dd><input type="text" name="twitter" value={this.state.twitter || ''} onChange={this.handleChange} /></dd>
									<dt>GitHub</dt>
									<dd><input type="text" name="github" value={this.state.github || ''} onChange={this.handleChange} /></dd>
									<dt>Facebook</dt>
									<dd><input type="text" name="facebook" value={this.state.facebook || ''} onChange={this.handleChange} /></dd>
									<dt>Dribbble</dt>
									<dd><input type="text" name="dribbble" value={this.state.dribbble || ''} onChange={this.handleChange} /></dd>
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