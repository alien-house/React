import React from 'react';


export default class Dashboard extends React.Component {
	
	render() {
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
				<h1 className="contents-title">Dashboard</h1>
				<div>
					
				</div>
			</div>
		);
	}

}
// const Child = ({ match }) => (
//   <div>
//     <h3>ID: {match.params.id}</h3>
//   </div>
// )

// <Route path={`${match.url}/:topicId`} component={Child}/>