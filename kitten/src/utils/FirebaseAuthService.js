import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const ID_TOKEN_KEY = 'id_token';
export const storageKey = 'KEY_FOR_LOCAL_STORAGE';
import {firebaseConfig} from "./config";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);
export var isLogIn = false;

export function login(email, password, setRedirectToRefFnc) {
  firebase.auth().signInWithEmailAndPassword(email, password)
     .then(function(firebaseUser) {
          // if it succeed, send this function to ...
        // Auth.authenticate(() => {
        //   this.setState({ redirectToReferrer: true })
        // })
        var user = firebase.auth().currentUser;
        var displayName = user.displayName;
        if (user) {
          setRedirectToRefFnc();
          // history.push('/dashboard');
          // history.replace('/dashboard');
          // replace({pathname: '/dashboard'});
        } 
     }.bind(this))
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("@"+errorCode);
      console.log("@__@"+errorMessage);
    });

}

// export function redirectAuth(nextState, replace) {
//   if (!isLogIn) {
//     replace({pathname: '/'});
//   }else{
//     replace({pathname: '/dashboard'});
//   }
// }

export function register(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        // var user = firebase.auth().currentUser;
      console.log(user);
      alert('Your account has created!');
        // logUser(user); // Optional
    },function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      // if(error == null){
      //  alert('Your account has created!');
      // }
      console.log(error);
      // [END_EXCLUDE]
    });

}

export function logout() {
  // clearIdToken();
  // clearAccessToken();
  firebase.auth().signOut();
  history.push('/');
}

export function updateUserProfile(obj) {
  var user = firebase.auth().currentUser;
  /* for this structure
  {
    displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg"
  }
  */
  user.updateProfile(obj).then(function() {
    // Update successful.
        alert("has saved!");
  }, function(error) {
    // An error happened.
  });
}

export function getUserProfile() {
  var user = firebase.auth().currentUser;
  console.log("きてる2？"+user);
  var userDate = {};
  if (user != null) {
    userDate = {
      name : user.displayName,
      email : user.email,
      photoUrl : user.photoURL,
      emailVerified : user.emailVerified,
      uid : user.uid
    }
    return userDate;
  }else{
    return false;
  }
}

export function updateDatabase(obj) {
  var userId = firebase.auth().currentUser.uid;
  // {
  //   username: name,
  //   email: email,
  //   profile_picture : imageUrl
  // }
  firebase.database().ref('users/' + userId).set(obj);
}

export function getDatabase(urlid, objFnc) {
  // var data;
  var user = firebase.auth().currentUser;
  if (user != null) {
    console.log("きてる＿？"+user);
    if(urlid == 'users'){
      urlid += "/" + firebase.auth().currentUser.uid;
    }
  }else{
    return false;
  }
  
  firebase.database().ref(urlid).once('value').then(function(snapshot) {
 
    objFnc(snapshot.val());
    // var options = [
    //  { value: 'one', label: 'One' },
    //  { value: 'two', label: 'Two' }
    // ];

  });
}

export function isAuthenticated() {
  console.log("tonnda");
  return !!firebase.auth().currentUser || !!localStorage.getItem(storageKey);
}

export function requireAuth(getIsLogin) {
  // console.log("きてる＿？"+getIsLogin);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // isLogIn = true;
      localStorage.setItem(storageKey, user.uid);
      getIsLogin(user.uid);
    }else{
      // isLogIn = false;
      localStorage.removeItem(storageKey);
      getIsLogin(null);
    }
  });
  //     
  // if (!isLoggedIn()) {
  //   replace({pathname: '/'});
  // }
}

// export function getIdToken() {
//   return localStorage.getItem(ID_TOKEN_KEY);
// }

// export function getAccessToken() {
//   return localStorage.getItem(ACCESS_TOKEN_KEY);
// }

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

// function clearAccessToken() {
//   localStorage.removeItem(ACCESS_TOKEN_KEY);
// }

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// // Get and store access_token in local storage
// export function setAccessToken() {
//   let accessToken = getParameterByName('access_token');
//   localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
// }

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {

  // const idToken = getIdToken();
  // return !!idToken && !isTokenExpired(idToken);
}

// function getTokenExpirationDate(encodedToken) {
//   const token = decode(encodedToken);
//   if (!token.exp) { return null; }

//   const date = new Date(0);
//   date.setUTCSeconds(token.exp);

//   return date;
// }

// function isTokenExpired(token) {
//   const expirationDate = getTokenExpirationDate(token);
//   return expirationDate < new Date();
// }