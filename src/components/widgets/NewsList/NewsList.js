import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import styles from './NewsList.css';
import { firebaseTeams, firebaseArticles, firebaseLooper} from '../../../firebase';

// components
import Buttons from '../Buttons/Buttons';
import CardInfo from '../CardInfo/CardInfo';

class NewsList extends Component {

  state = {
    items: [],
    teams: [],
    amount: this.props.amount,
    start: this.props.start,
    end: this.props.start + this.props.amount
  }

  componentWillMount() {
    this.request(this.state.start, this.state.end);
  }

  request = (start, end) => {
    if(this.state.teams.length < 1) {
      
      firebaseTeams.once('value')
      .then((snapshot) => {
        const teams = firebaseLooper(snapshot);
        this.setState({
          teams
        })
      })
    }  

    firebaseArticles.orderByChild('id').startAt(start).endAt(end).once('value')
      .then((snapshot) => {
        const articles = firebaseLooper(snapshot);
        this.setState({
          items: [...this.state.items, ...articles],
          start,
          end 
        })
      })
      .catch(e => { console.log(e)})
    
  }

  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end + 1, end)
  }

  renderNews = (type) => {
    let template = null;

    switch(type) {
      case 'card':
        template = this.state.items.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_enter
            }}
            timeout={500}
            key={i}
          >
            <div>
              <div className={styles.newslist_item}>
                <Link to={`/articles/${item.id}`}>
                  <CardInfo 
                    teams={this.state.teams} 
                    team={item.team}
                    date={item.date}/>
                  <h2>{item.title}</h2>
                </Link>
              </div>
            </div>
          </CSSTransition>
        ));
        break;

      case 'cardMain':
        template = template = this.state.items.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_enter
            }}
            timeout={500}
            key={i}
          >
            <Link to={`/articles/${item.id}`}>
              <div className={styles.flex_wrapper}>
                <div className={styles.left}
                  style={{
                    background: `url('/images/articles/${item.image}')`
                  }}
                >
                  <div></div>
                </div>
                <div className={styles.right}>
                  <CardInfo 
                    teams={this.state.teams} 
                    team={item.team}
                    date={item.date}/>
                  <h2>{item.title}</h2>
                </div>
              </div>
            </Link>
          </CSSTransition>
        ));
        break;

      default:
        template = null;
    }

    return template;
  }

  render() { 
    return (
      <div>
        <TransitionGroup
          component="div"
          className="list"
        >
          { this.renderNews(this.props.type) }
        </TransitionGroup>
        <Buttons 
          type="loadmore"
          loadMore={() => this.loadMore()}
          cta="Load More News"
        />
      </div>
    );
  }
}

export default NewsList;