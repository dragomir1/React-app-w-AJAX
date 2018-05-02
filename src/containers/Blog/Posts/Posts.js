import React, { Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
// import { Link } from 'react-router-dom';


class Posts extends Component {

  // in order to render that data to the screen we need state.
      state = {
        posts: [],
      }

  postSelectedHandler =( id) => {
    // this code is an example of navigating programmatically. in this use case, you want to naviagate after something finished. after an http request was sent.
    // we take advantaage of the history object we received on the props...navigation is about a stack of pages.  that's why the back and forward buttons work on a browser.
    // the PUSH method allows you to move around in the stack. it's a string or an object.
    this.props.history.push({pathname: '/posts/' + id})

    // this.setState({selectedPostId: id});
  }

  // CREATION LIFE CYCLE HOOK THAT CAUSES SIDE-EFFECTS. THE HTTP REQUEST IS A SIDE-EFFECT. IF REACT IS DYNAMICALLY OUTPUTTING DATA, THE CHANING OF DATA IS A SIDE-EFFECT AFFECTING YOUR APP.
  // componentDidMount IS A GREAT PLACE FOR CASUING SIDE EFFECT BUT NOT FOR UPDATING STATES SINCE IT CAUSES A RE-RENDER.
  // axios has a built in GET method for fetching data.  GET RETURNS A PROMISE.
  // THEN IS A METHOD Which takes a function as the input. and this fucntion gets executed once the promise resolves..in this case, once the data is finished loading.
  // THEN recives and response object as an input
  componentDidMount() {
    console.log(this.props);
      axios.get('/posts')
      // UPDATE STATE ONCE WE FETCH DATA FROM THE SERVER.  THE PLACE TO DO IT IS INSIDE THE THEN METHOD.  DUE TO THE ASYNCHORNOUS NATURE OF JS, IF WE CALL IT OUTSIDE..JS WONT WAIT FOR THE PROMISE TO RESOLVE. AND THEREFORE IT WILL RUN THE NEXT LINE OF CODE.  THE BEST PLACE TO DO IT IS INSIDE THE THEN METHOD WHICH EXECUTES WHEN PROMISE RESOLVES.
      // DATA property is availale on the response object.
        .then(response => {
          const posts = response.data.slice(0, 6);
          const updatedPosts = posts.map(post => {
            return {
              ...post,
              author: 'Michael',
            }
          });
          this.setState({posts: updatedPosts});
          // console.log(response);
        })
        // WITH PROMISES, WE CAN USE THE CATCH METHOD TO CATCH ERRORS.
        .catch(error => {
          console.log(error);
          // this.setState({ error:true });
        });
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
    if(!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={'/' + post.id} >
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)} />
          // </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        {/*THIS IS A NESTED ROUTE.you can use the route component anwhere in your app as long as the component where you are using it is wrapped by the BrowserRouter component*/}
        <Route path={this.props.match.url + '/:id' } exact component={FullPost} />
      </div>
    );
  }
}


export default Posts;
