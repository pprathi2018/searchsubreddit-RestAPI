# searchsubreddit-RestAPI

This application displays the top 20 articles from a given subreddit in a specified timeframe. The user may enter a subreddit and specify a timeframe through the User Interface implemented with React components and routing. A python-flask REST API backend is used to retrieve and filter data from the public reddit API. The data is hosted on its own server, which the React component can access to *fetch* the data. The React application is deployed through Heroku here:

https://searchsubredditcomments.herokuapp.com/

## Development Stack
Python-Flask is used to retrieve JSON formatted data from reddit API.
React renders a UI and fetches data from python REST API server when necessary
Both servers hosted on Heroku

## Launch application locally
- Clone repository into local folder
- Within directory, run yarn start-api and find backend python server on http://localhost:5000/api/hello
- On seperate command line and within directory, run npm run dev and find application on http://localhost:3000/
- This is how the development environment may be set up

## Application Process
The React application has a homepage that asks for a user to enter a subreddit name and specify a timeframe of top articles they would like to see. Once a submission is received, the appliction is routed to /comments endpoint where the top 20 comments are displayed. 

Each of articles display the Title, Upvotes, Downvotes, and Author. Each article can also be clicked to open the actual subreddit post. 

When a submission is received, the specific inputs are provided in the url queries in a *fetch()* request to the flask REST API. The python code retrieves data from the reddit API, which is displayed in a clean way on the React webpage. 

The python REST API is deployed to Heroku at https://searchsubreddit-api.herokuapp.com/api/hello and the React app is https://searchsubredditcomments.herokuapp.com/ for production.
