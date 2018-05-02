import React, { Component } from 'react';
import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

  state = {
    loadedPost: null
  }

  // WHEN YOU UPDATE THE STATE WITHIN THE componentDidUpdate, IT CREATES AN INFINITE LOOP.
  // we converted componentDidUpdate to componentDidMount.  becuase we are no longer updating.  now we are mounting the requested post.  we are rendering that request.
      // match and params are properties on the Object. for reference, console.log the props. to see the object.

      // WHEN YOU ARE SELECTING INDIVIDUAL POSTS TO LOAD, AND THEY DON'T, IS BECUASE ONCE THE COMPONENT MOUNTS THE FIRST TIME, REACT WILL NOT EXECUTE AND REMOUNT ANOTHER COMPONENT. BECUASE THE COMPONENT itself didn't change.  that's why we need to implament componentDidUpdate.

  componentDidMount () {
   console.log(this.props);
   this.loadData();

  }
// implament this component becuase this will be updated everytime you click on a different post.
  componentDidUpdate() {
    this.loadData();

  }
// this is a convenience method that holds the code. this code was previously in componentDidMount
  loadData() {
    if(this.props.match.params.id) {
      // this.state.loadedPost.id is a number and this.props.match.params.id is a string. currently !== is strict so we need to do != to just check for value.
      if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != this.props.match.params.id)) {
        axios.get('/posts/' + this.props.match.params.id)
        .then(response => {
          // console.log(response);
          this.setState({loadedPost: response.data})
        });
      }
    }
  }

  deletePosthandler = () => {
    axios.delete('/posts/' + this.props.match.params.id)
      .then(response => {
        console.log(response);
      });
  }



    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id) {
          post = <p style={{textAlign: 'center'}}>Loading....</p>;
        }

        if(this.state.loadedPost) {
          post = (
              <div className="FullPost">
                  <h1>{this.state.loadedPost.title}</h1>
                  <p>{this.state.loadedPost.body}</p>
                  <div className="Edit">
                      <button onClick={this.deletePosthandler}
                        className="Delete">Delete</button>
                  </div>
              </div>

          );
        }
        return post;
    }
}

export default FullPost;
