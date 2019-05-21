import React from 'react';
import * as API from '../../service/api';
import './FilmInfo.scss';
import PropTypes from 'prop-types';

function FilmInfo(props) {
  const searchMovie = `https://www.google.com/search?q=${props.title} ${props.release_date && props.release_date.substr(0, 4)} film`;
  const searchDirector = `https://www.google.com/search?q=${props.director} director`;

  const [imgUrl, setImg] = React.useState(null);

  //Search for image
  React.useEffect(() => {
    const imageQuery = `${props.title} ${props.release_date && props.release_date.substr(0, 4)} film poster`;
    API.queryImage(imageQuery).then(res => {
      if (res.data && res.data.img) {
        setImg(res.data.img);
      }
    }).catch(err=>{});
  }, [props.title, props.release_date]);


  const producers = props.producer.split(',').map((producer, idx) => (
    <React.Fragment key={idx}>
      <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/search?q=${producer} film producer`}
      >{producer}</a>
      <span>,</span>
    </React.Fragment>
  ));

  return (
    <div className="FilmInfo">
      <div className="info">

        <img src={imgUrl} className="img-cover" alt={props.title}/>

        <div className="details">
          <a target="_blank" rel="noopener noreferrer" href={searchMovie} >
            <h4>{props.title}</h4>
          </a>
          <ul>
            <li>Director: <a target="_blank" rel="noopener noreferrer" href={searchDirector}><b>{props.director}</b></a></li>
            <li>Producers: {producers}</li>
            <li>Release Date: {props.release_date}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

FilmInfo.propTypes = {
  producer: PropTypes.string,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  director: PropTypes.string
}

export default FilmInfo

