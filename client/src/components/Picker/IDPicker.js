import React from 'react';
import PropTypes from 'prop-types';
import './IDPicker.scss';

const SWPeople = [                  
                  {id:1,name:'Luke Skywalker'},
                  {id:7,name:'Beru Whitesun lars'},
                  {id:10,name:'Obi-Wan Kenobi'},                  
                  {id:12,name:'Wilhuff Tarkin'},
                  {id:13,name:'Chewbacca'},                  
                  {id:14,name:'Han Solo'},
                  {id:15,name:'Greedo'}                  
                 ];

function IDPicker(props) {

  //const [isOpen, setIsOpen] = React.useState(false);
  const {isOpen} = props;

  const list = SWPeople.map((itm,idx)=>(
    <li key={idx} className="lstx list-group-item d-flex justify-content-between align-items-center" onClick={()=>{props.onSelect(itm.id)}}>
    {itm.name}
      <span className="lstx badge badge-light badge-pill">id:{itm.id}</span>
    </li>
  ));
  return (
    <div className="btn-picker lstx">
      <i id="picker-btn" className="fa fa-2x fa-arrow-circle-o-down lstx" title="Pick an Star Wars People ID from the list..."
      onClick={props.toggle}
      ></i>
      <div className="dv-pre-list lstx" style={{height:isOpen?'auto':'0px'}} 
      >
        <ul className="list-group lstx"> 
        
        {props.canClear?(
        <li  className="item-clear list-group-item d-flex justify-content-start align-items-center" 
        onClick={()=>{props.onSelect(null)}}>
          <i className="fa fa-times">&nbsp;</i>Clear Results    
        </li>) :null}

        {list}
        </ul>
      </div>
    </div>
  )
}

IDPicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  canClear: PropTypes.bool.isRequired,
}


export default IDPicker;
