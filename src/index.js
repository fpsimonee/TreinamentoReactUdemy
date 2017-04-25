import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAMPqK3Z0-cV4pB1wZktoRxFo0gKe7vP_c';



// create a new Component. This component produce some HTML

// const App = function (){
//
//   return (<div>
//             <SearchBar />
//           </div>
//         );
// }

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
                  videos: [],
                  selectedVideo: null
                 };

      this.videoSearch('surfboards')
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
        this.setState({
          videos: videos,
          selectedVideo : videos[0]
        });
        // this.setState({videos: videos});
    });
  }


  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300 );

    return (<div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail videos={this.state.selectedVideo}/>
                <VideoList
                  OnVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                  videos={this.state.videos}
                />
              </div>
            );
  }
}


// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App /> , document.querySelector('.container'));
