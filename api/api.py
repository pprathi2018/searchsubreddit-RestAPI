from flask import Flask, jsonify, request
from flask_cors import CORS
import praw
app = Flask(__name__)
CORS(app)


reddit = praw.Reddit(client_id = 'ngktH6WZRpXVVg',
                     client_secret = 'EtxfNB68ZxKYNd_kfMYthHPFzh7JDg',
                     user_agent = 'pprathi2018')

def get_articles(sub, timeframe):
    sub_reddit = reddit.subreddit(sub)
    top_articles = sub_reddit.top(timeframe, limit=20)
    result = []
    output = {}
    for article in top_articles:
        temp = {"Title": article.title,
                  "Url": article.url,
                  "Upvotes": article.ups,
                  "Downvotes": article.downs,
                  "Redditurl": article.permalink,
                  "Subreddit": sub,
                  "Author": str(article.author)
                  }
        result.append(temp)
    output['subreddit_name'] = sub
    output['subreddit_timeframe'] = timeframe
    output['subreddit_articles'] = result
    return output

@app.route('/api/hello')
def hello():
    return jsonify({'Hello':"Welcome to python server for API"})

@app.route('/api/topcomments')
def get_comments():
    sub_name = request.args.get('sub')
    timeframe = request.args.get('timeframe')
    sub_dict = get_articles(sub_name, timeframe)
    return jsonify(sub_dict)
