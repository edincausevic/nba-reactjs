import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import Home from './components/Home/Home';
import NewsArticle from './components/Articles/News/Post';
import VideoArticle from './components/Articles/Videos/Video';
import VideosMain from './components/Articles/Videos/Main/VideosMain';
import NewsMain from './components/Articles/News/Main';
import Layout from './hoc/Layout/Layout';

const Routes = (props) => {

  return (
    <Layout user={props.user}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news" exact component={NewsMain} />
        <Route path="/articles/:id" exact component={NewsArticle} />
        <Route path="/videos/:id" exact component={VideoArticle} />
        <Route path="/videos" exact component={VideosMain} />
      </Switch>
    </Layout>
  );
}

export default Routes;