import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
// import axios from 'axios';
import axios from '../../axios';

class Blog extends Component {
// in order to render that data to the screen we need state.
    state = {
      posts: [],
      selectedPostId: null,
      error: false,
    }
  // CREATION LIFE CYCLE HOOK THAT CAUSES SIDE-EFFECTS. THE HTTP REQUEST IS A SIDE-EFFECT. IF REACT IS DYNAMICALLY OUTPUTTING DATA, THE CHANING OF DATA IS A SIDE-EFFECT AFFECTING YOUR APP.
  // componentDidMount IS A GREAT PLACE FOR CASUING SIDE EFFECT BUT NOT FOR UPDATING STATES SINCE IT CAUSES A RE-RENDER.
  // axios has a built in GET method for fetching data.  GET RETURNS A PROMISE.
  // THEN IS A METHOD Which takes a function as the input. and this fucntion gets executed once the promise resolves..in this case, once the data is finished loading.
  // THEN recives and response object as an input
  componentDidMount() {
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
          this.setState({ error:true });
        });
  }

  postSelectedHandler =( id) => {
    this.setState({selectedPostId: id});
  }

    render () {
      let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
      if(!this.state.error) {
        posts = this.state.posts.map(post => {
          return <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)} />
        });
      }

        return (
            <div>
                <section className="Posts">
                  {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
