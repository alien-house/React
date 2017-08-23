import createHistory from 'history/createBrowserHistory'
const history = createHistory()
export const ID_TOKEN_KEY = 'KEY_FOR_LOCAL_STORAGE';
import {firebaseConfig} from "./config";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);
export var isLogIn = false;
export var userData;
export const storageRef = firebase.storage().ref();

export function login(email, password, setRedirectToRefFnc) {
  firebase.auth().signInWithEmailAndPassword(email, password)
     .then(function(firebaseUser) {
          // if it succeed, send this function to ...
        // Auth.authenticate(() => {
        //   this.setState({ redirectToReferrer: true })
        // })
        var user = firebase.auth().currentUser;
        // var displayName = user.displayName;
        if (user) {
          setRedirectToRefFnc();
          // history.push('/dashboard');
          // history.replace('/dashboard');
          // replace({pathname: '/dashboard'});
        } 
     })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log("@"+errorCode);
      // console.log("@__@"+errorMessage);
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
      // console.log(user);
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
      // console.log(error);
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
  // console.log("updateUserProfile---------------");
  // console.dir(user);
  if(user){
    user.updateProfile(obj).then(function() {
      // Update successful.
          alert("has saved!");
          // getUserProfile();
    }, function(error) {
      // An error happened.
    });
  }
}

export function getUserProfile() {
  var user = firebase.auth().currentUser;
  // console.log("きてる2？"+user);
  // console.dir(user);
  var userDate = {};
  if (user != null) {
    userDate = {
      name : user.displayName,
      email : user.email,
      photoURL : user.photoURL,
      emailVerified : user.emailVerified,
      uid : user.uid
    }
    return userDate;
  }else{
  // console.log("getUserProfile","来てない");
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

export function updateStorage(file, filename, func) {
  let userId = firebase.auth().currentUser.uid;
  if(userId == null){
    userId = getIdToken();
  }
  if(userId){
    var mountainImagesRef = storageRef.child('images/' + userId + '/' + filename + '.jpg');
    mountainImagesRef.put(file).then(function(snapshot) {
      // console.log('Uploaded a blob or file!');
      // console.dir(snapshot.metadata.fullPath);
      getStorage(snapshot.metadata.fullPath);
      func(snapshot.metadata);
    });

  }
}

export function getStorage(dataFullPath) {
  var pathReference = storageRef.child(dataFullPath);
    return pathReference.getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
    // This can be downloaded directly:
    // var xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = function(event) {
    //   var blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();

    return url;

    // Or inserted into an <img> element:
    // var img = document.getElementById('myimg');
    // img.src = url;
    }).catch(function(error) {
    // Handle any errors
  });
}

export function getDatabase(urlid, objFnc, userID = null) {
  // var data;
  var user = firebase.auth().currentUser;
  if (user != null || userID != null) {
    // console.log("きてる＿？"+user);
    var urlUserID;
    if(user == null){
      urlUserID = userID;
    }else{
      urlUserID = firebase.auth().currentUser.uid;
    }
    if(urlid === 'users'){
      urlid += "/" + urlUserID;
    }
  }else{
    console.log("getDatabase取得できず");
  }
  
  firebase.database().ref(urlid).once('value').then(function(snapshot) {
 
    objFnc(snapshot.val());
    // var options = [
    //  { value: 'one', label: 'One' },
    //  { value: 'two', label: 'Two' }
    // ];
  });
}



export function getDatabaseTest() {
  // var data;
  // var user = firebase.auth().currentUser;
  // if (user != null) {
  //   // console.log("きてる＿？"+user);
  //   var urlUserID;
  //   if(user == null){
  //   }else{
  //     urlUserID = firebase.auth().currentUser.uid;
  //   }
  // }else{
  //   console.log("getDatabase取得できず");
  // }
  
  return firebase.database().ref('devStatus').once('value').then(function(snapshot) {
    // console.log(snapshot.val());
    return snapshot.val();
  });
}








export function isAuthenticated() {
  // console.log("tonnda");
  return !!firebase.auth().currentUser || !!localStorage.getItem(ID_TOKEN_KEY);
}

export function getUserdata() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // isLogIn = true;
      localStorage.setItem(ID_TOKEN_KEY, user.uid);
      userData = user;
      // console.log('useruser::', user);
    }else{
      // isLogIn = false;
      // console.log('getUserdata::', user);
      localStorage.removeItem(ID_TOKEN_KEY);
    }
  });
}



export function requireAuth(getIsLogin) {
  // console.log("きてる＿？"+getIsLogin);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // isLogIn = true;
      localStorage.setItem(ID_TOKEN_KEY, user.uid);
      getIsLogin(user.uid);
      userData = user;
    }else{
      // isLogIn = false;
      localStorage.removeItem(ID_TOKEN_KEY);
      getIsLogin(null);
    }
  });
  //     
  // if (!isLoggedIn()) {
  //   replace({pathname: '/'});
  // }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

// export function getAccessToken() {
//   return localStorage.getItem(ACCESS_TOKEN_KEY);
// }

// function clearIdToken() {
//   localStorage.removeItem(ID_TOKEN_KEY);
// }

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