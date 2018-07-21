import React, { Component } from 'react';

import NewsSlider from '../../../widgets/NewsSlider/NewsSlider';
import NewsList from '../../../widgets/NewsList/NewsList';

class NewsMain extends Component {
  render() {
    return (
      <div>
        <NewsSlider
          type="featured"
          settings={{dots:false}}
          start={0}
          amount={3}
        />
        <NewsList
          type="cardMain"
          loadmore={true}
          start={3}
          amount={10}
        />
      </div>
    );
  }
}

export default NewsMain;