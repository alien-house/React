import React from 'react';

export default class ConditionalRendering extends React.Component {
	render() {
		return (
			<Greeting isLoggedIn={false} />
		);
	}
}

const UserGreeting = (props) => (
  <h1>Welcome back!</h1>
);

const GuestGreeting = (props) => (
  <h1>Please sign up.</h1>
);

const Greeting = (props) => {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <UserGreeting />;
	}
		return <GuestGreeting />;
};


