import React, { useState, useEffect } from 'react';
import '../App.css';
import { useLocation, withRouter } from 'react-router-dom';


class Comments extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            curComments: [],
            message: 'Loading...'
        }

        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        const subName = this.props.location.state.subname;
        const timeframe = this.props.location.state.timeframe;

        fetch(process.env.REACT_APP_API_URL+'/api/topcomments?sub='+subName+'&timeframe='+timeframe).then(res => res.json()).then(data => {
            if (data.subreddit_articles.length == 0) {
                this.setState({
                    curComments: [],
                    message: "No posts for this subreddit. Try a different one!"
                })
            }
            else {
                this.setState({
                    curComments: data.subreddit_articles,
                    message: ''
                })
            }
        })
        .catch(res => {
            this.setState({
                curComments: [],
                message: "No posts for this subreddit. Try a different one!"
            })
        });
    }

    handleBack() {
        this.props.history.goBack();
    }

    render() {
        const timeframe_dict={
            'hour': 'the last hour',
            'day' : 'today',
            'week' : 'this week',
            'month' : 'this month',
            'year' : 'this year',
            'all' : 'all time'

        }
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Subreddit Search</h1>
                    <h3>Here are your top 20 comments from r/{this.props.location.state.subname} for {timeframe_dict[this.props.location.state.timeframe]}! </h3>
                    <button class="submit" onClick={this.handleBack}>Go Back</button>
                    <p>{this.state.message}</p>
                    {this.state.curComments.map(comment => (
                        <a class="redditpost" href={"https://www.reddit.com"+comment.Redditurl}>
                            <div class="posttitle">{comment.Title}</div>
                            <div class="postcontent">
        
                                <p><span role="img" aria-label="upvote">👍</span>:{comment.Upvotes} 
                                &nbsp; &nbsp;
                                <span role="img" aria-label="downvote">👎</span>:{comment.Downvotes}</p>
                            </div>
                            <div class="postauthor">Posted by {comment.Author}</div>
                        </a>
                    ))}
                </header>
            </div>
        );
    }
}

export default withRouter(Comments);