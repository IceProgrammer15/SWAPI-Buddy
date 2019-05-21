import React from 'react';
import './PersonalInfo.scss';
import * as API from '../../service/api';
import PropTypes from 'prop-types';

function PersonalInfo(props) {
  const query = `${props.name} portrait star wars movie`;
  const searchUrl = `https://www.google.com/search?q=${query}`;

  const [imgUrl, setImg] = React.useState(null);

  //Search for image
  React.useEffect(() => {
    const sQuery = `${props.name} portrait star wars movie`
    API.queryImage(sQuery).then(res => {
      if (res.data && res.data.img) {
        setImg(res.data.img);
      }
    });
  }, [props.name]);


  return (
    <div className="PersonalInfo">
      <div className="info">
        <img src={imgUrl} className="img-cover" alt={props.name}/>
        <div className="details">
          <a target="_blank" rel="noopener noreferrer" href={searchUrl} >
            <h4>{props.name}</h4>
          </a>
          <ul>
            <li>Height: {props.height}</li>
            <li>Mass: {props.mass}</li>
            <li>Hair Color: {props.hair_color}</li>
            <li>Skin Color: {props.skin_color}</li>
            <li>Gender: {props.gender}</li>
            <li>Birth Year: {props.birth_year}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

PersonalInfo.propTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.string,
  mass: PropTypes.string,
  hair_color: PropTypes.string,
  gender: PropTypes.string,
  birth_year: PropTypes.string
}

export default PersonalInfo

