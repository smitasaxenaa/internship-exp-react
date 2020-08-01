import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';


function removeTags(str) {
  if ((str===null) || (str===''))
  return 'empty';
  else
  str = str.toString();
  return str.replace( /(<([^>]+)>)/ig, '');
}

function getMonthName(num){
  switch(num){
      case 1: return 'Jan';
      case 2: return 'Feb';
      case 3: return 'March';
      case 4: return 'April';
      case 5: return 'May';
      case 6: return 'June';
      case 7: return 'July';
      case 8: return 'Aug';
      case 9: return 'Sep';
      case 10: return 'Oct';
      case 11: return 'Nov';
      case 12: return 'Dec';
  }
}

function convertDate(pdate) {

  let ndate = new Date(pdate);
  const publishDate = getMonthName(ndate.getMonth()) + ' ' + ndate.getDate() + ',' + ' ' + ndate.getFullYear();

  return publishDate;
  
}

class UpperFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post1: {
        title: "",
        author: "",
        pubDate: "",
        content: "",
        link:"",
        thumbnail:"",
        
      },
      post2: {
        title: "",
        author: "",
        pubDate: "",
        content: "",
        link:"",
        thumbnail:"",
      },
      post3: {
        title: "",
        author: "",
        pubDate: "",
        content: "",
        link:"",
        thumbnail:"",
      }
    }
  }


  componentDidMount() {
    axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fthe-internship-experience-iit-guwahati')
    .then(response => {
        this.setState({ post1: response.data.items[0], post2:response.data.items[1], post3: response.data.items[2] });
      }).catch(err => {
        console.log(err);
      })
  }

  render() {

    return (<div className="container">

      <div className="upperfeed-box unselectable">
        <div className="up-1">    
          <div onClick={e=>(window.location=this.state.post1.link)} className="up1-image" style={{ backgroundImage: 'url(' + this.state.post1.thumbnail + ')' }}></div>
          <a class='feedbox-links' href={this.state.post1.link}>
          <div className="up1-content">
          <div className="up1-title">{this.state.post1.title}</div>
            <div className="up1-author">{this.state.post1.author}</div>
            <div className="up1-desc">{removeTags(this.state.post1.content).substring(0, 400) + "...."}</div>
            <div className="up1-author-date">
              <div className="up1-author2">{this.state.post1.author}</div>
              <div className="up1-date">{convertDate(this.state.post1.pubDate)}</div>
            </div>
          </div>
          </a>
        </div>

        <div className="up-2">
          <div onClick={e=>(window.location=this.state.post2.link)} className="up2-image" style={{ backgroundImage: 'url(' + this.state.post2.thumbnail + ')' }}></div>
          <a class='feedbox-links' href={this.state.post2.link}>
          <div className="up2-content"><div className="up2-title">{this.state.post2.title}</div>
            <div className="up2-desc">{removeTags(this.state.post2.content).substring(0, 300) + "...."}</div>
          </div>
          <div className="up2-author-date">
            <div className="up2-author" >
            {this.state.post2.author}
              </div>
            <div className="up2-date">
            {convertDate(this.state.post2.pubDate)}
              </div>
          </div>
          </a>
        </div>
        
        <div className="up-2">
          <div onClick={e=>(window.location=this.state.post3.link)} className="up2-image" style={{ backgroundImage: 'url(' + this.state.post3.thumbnail + ')' }}></div>
          <a class='feedbox-links' href={this.state.post3.link}>
          <div className="up2-content"><div className="up2-title">{this.state.post3.title}</div>
            <div className="up2-desc">{removeTags(this.state.post3.content).substring(0, 300) + "...."}</div>
          </div>
          <div className="up2-author-date">
            <div className="up2-author" >
            {this.state.post3.author}
              </div>
            <div className="up2-date">
            {convertDate(this.state.post3.pubDate)}
              </div>
          </div>
          </a>
        </div>

      </div>

    </div>);
  }
}

export default UpperFeed;