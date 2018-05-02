import React, { Component } from 'react';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
// import axios from 'axios';
import axios from '../../axios';
// this loads the route component.  the Link component allows us to create links.
// import { Route, Link } from 'react-router-dom';

// the NAVLINK is a component that is similar to the LINK, the difference is that is has extra properties which allow us to define some styling for the acive link.
// the SWITCH COMPONENT TELLS REACT TO ONLY LOAD ONE route at a time.
import { Route, NavLink, Switch } from 'react-router-dom';

class Blog extends Component {
  render () {
    // the <Route /> component has a path property that is reserved.  Path is a string. you define the path for which the route to become active.
    // render={() => } defines what should happen whent this path is the active path.
    // the exact property is a boolean.
    // react-router to deterime which path you're on, see if your current path starts with '/' so the prefix is the "/" so any route that that starts with the "/" prefix will render content on all the views.
    // to overide this behavior you need to add the "exact" prop.  which is a boolean.
    // we can pass a component property which should be rendered in the route's place.
    // component is a reference to the fucntion or class we want to use.
    // this is the CORE functionality of the router.
        return (

            <div className="Blog">
              <header>
                <nav>
                <ul>
                  {/*we replace anchor tags with the Link component.  The "to" property tell the Link where it should lead to.*/}
                  {/*NAVLINK TAKEAWAYS - TO STYLE ACTIVE LINKS, YOU HAVE TO USE THE NAVLINK OBJECT,AND YOU MIGHT NEED TO USE EXACT TO MAKE SURE YOU STYLE THE LINKS FOR THE ROUTES YOU WANT TO STYLE*/}
                    <li><NavLink
                      to="/"
                      exact
                      activeClassName="my-active"
                      activeStyle={{
                        color: '#fa923f',
                        textDecoration: 'underline'
                      }}>Posts</NavLink></li>
                    {/*to can also be a js object we output DYNAMICALLY, so two sets of curly braces.  first pair outputs dynamically, second pair is the js object.  within the object we can configure where we want to go to.*/}
                    {/*pathname is a property of to.the hashtag property allows us to jump to a feature*/}
                    <li><NavLink
                      to={{
                        pathname: '/new-post',
                        hash: '#submit',
                        search: '?quick-submit=true'
                      }}
                      activeStyle={{
                        color: '#fa923f',
                        textDecoration: 'underline'
                      }}

                    >New Post</NavLink></li>
                  </ul>
                </nav>
              </header>
              {/*the issue here is that this configuration reloads the entire app again.  losing our state.  we want to not reload every time but only render specific components. we want to make sure we stay in the application when clicking on links inside of it.*/}
              {/*THIS IS PARSED FROM TOP TO BOTTOM.  NEW-POST IS RECOGNIZED FIRST*/}

              {/*THE SWITCH COMPONENT TELLS REACT TO ONLY LOAD ONE ROUTE AT A TIME. THE FIRST ONE YOU FIND THAT MATCHES FROM A GIVEN ROUTE. you can also place routes outside of swtich..mix and match*/}
              <Route path="/" exact component={Posts} />
              <Switch>
                <Route path="/new-post" component={NewPost } />
                {/*WE ARE ARE LOADING A SPECIC POST.  WE NEED TO DEFINE A FLEXIBLE VARIABLE ROUTE PARAMETER*/}
                <Route path="/:id" exact component={FullPost} />
              </Switch>


            </div>
        );
    }
}

export default Blog;
