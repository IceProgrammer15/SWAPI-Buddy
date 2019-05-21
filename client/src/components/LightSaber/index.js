import React from 'react';
import PropTypes from 'prop-types';
import './LightSaber.scss';

function LightSaber(props) {
  return (
      <div className={["lightsaber", props.on?"on":null, props.color].join(" ")} style={{...props.style}}>
        <div className="laser-handle">
        <div className="switch"></div>
        </div>
				<div className="plasma obi-wan"></div>
      </div>
  )
}

/* propTypes =============================================================== */
LightSaber.propTypes = {
  on:PropTypes.bool.isRequired,
  color:PropTypes.string
}


export default LightSaber;