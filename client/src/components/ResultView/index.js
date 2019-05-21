import React from 'react'
import './ResultView.scss';
import FilmInfo from '../Film/FilmInfo';
import PersonalInfo from '../Personal/PersonalInfo';
import anime from 'animejs/lib/anime.es';

import PropTypes from 'prop-types'

function ResultView(props) {
    const { data } = props;

    React.useEffect(() => {
        anime({
            targets: '#info-pi,#info-hp,#info-sp,#info-mv',
            translateY: [500, 0],
            opacity: [0, 1],
            direction: 'normal',
            easing: 'easeOutElastic(1, 1.5)',
            loop: false,
            delay: function (el, i, l) {
                return i * 100;
            },
            endDelay: function (el, i, l) {
                return (l - i) * 100;
            }
        });
    }, [data]);


    if (!data) {
        return null;
    }

    const films = (data.films || []).map((itm, idx) => (
        <React.Fragment key={idx}>
            <FilmInfo {...itm} />
        </React.Fragment>
    ));
    const species = data.species.map((itm, idx) => (
        <React.Fragment key={idx}>
            <li >Name: {itm.name}</li>
            <li >Average Lifespan: {itm.average_lifespan}</li>
            <li >Designation: {itm.designation}</li>
            <li >Language: {itm.language}</li>
            <hr />
        </React.Fragment>
    ));
    return (
        <div className="ResultView container">
            <div className="d-flex justify-content-between flex-wrap">
                <div id="info-pi" className="card-container">
                    <div className="card border-secondary" >
                        <div className="card-header"><i className="fa fa-child">&nbsp;</i>Personal Information</div>
                        <div className="card-body p-0" >

                            <PersonalInfo {...data} />

                        </div>
                    </div>
                </div>

                <div className="card-container" id="info-hp">
                    <div className="card border-secondary" >
                        <div className="card-header"><i className="fa fa-fort-awesome">&nbsp;</i>Home Planet</div>
                        <div className="card-body">
                            <ul>
                                <li>Name: {data.homeworld.name}</li>
                                <li>Terrain: {data.homeworld.terrain}</li>
                                <li>Population: {data.homeworld.population}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card-container" id="info-sp">
                    <div className="card border-secondary" >
                        <div className="card-header"><i className="fa fa-venus-mars">&nbsp;</i>Species</div>
                        <div className="card-body">
                            <ul>
                                {species}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between">
                <div className="card-container" id="info-mv">
                    <div className="card border-secondary" >
                        <div className="card-header"><i className="fa fa-film">&nbsp;</i>Films</div>
                        <div className="card-body">
                            <div className="d-flex flex-wrap">
                                {films}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ResultView.propTypes = {
    data: PropTypes.object
}

export default ResultView

