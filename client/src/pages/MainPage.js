import React, { Component } from 'react'
import anime from 'animejs/lib/anime.es';
import Logo from '../components/Logo';
import LightSaber from '../components/LightSaber';
import { randomInt } from '../service/utils';
import ResultView from '../components/ResultView';
import Picker from '../components/Picker/IDPicker';
import * as API from '../service/api';
import './Main.scss'

const BEAM_COLORS = ['blue', 'red', 'magenta', 'yellow', 'green'];

class MainPage extends Component {
  initialLoad = true;
  queryInput = null;
  state = {
    inputFocus: false,
    beamColor: 'blue',
    queryString: '',
    error: null,
    serverError: null,
    apiBusy: false,
    data: null,
    focused: false
  };

  lightSaberAnim = null;

  componentDidMount() {
    this.lightSaberAnim = anime({
      targets: '.lightsaber',
      top: [-35, -5],
      easing: 'easeInOutSine',
      duration: 500,
      autoplay: false
    });
  }

  async submitQuery() {
    if(this.state.apiBusy){
      return;
    }
    const id = +this.state.queryString.trim();
    if (!id) {
      return;
    }

    this.setState({ apiBusy: true, pickerOpen: false, serverError: null });
    const res = await API.queryPeopleById(id);
    const sError = res.ok ? null : `Error : ${res.problem}. Please try again.`;
    this.setState({ apiBusy: false, serverError: sError, data: res.ok && res.data });
  }

  animateLight(bActive) {
    if (!this.lightSaberAnim) {
      return;
    }
    if (bActive === this.lightSaberAnim.reversed) {
      this.lightSaberAnim.reverse();
    }
    this.lightSaberAnim.play();
  }

  randomColor() {
    //Get color index to make sure next random color is different
    const colorIndex = BEAM_COLORS.indexOf(this.state.beamColor);
    //Always use blue color for the fist time
    return this.initialLoad ? 'blue' : BEAM_COLORS[randomInt(0, BEAM_COLORS.length - 1, colorIndex)];
  }

  inputFocuseChanged(bFocused) {
    if (bFocused && this.state.focused) {
      return;
    }

    this.setState({ focused: bFocused });
    const randomColor = bFocused ? this.randomColor() : this.state.color;
    if (this.initialLoad && bFocused) {
      this.initialLoad = false;
    }

    setTimeout(() => {
      this.setState({ inputFocus: bFocused, beamColor: randomColor });
    }, bFocused ? 300 : 0);

    setTimeout(() => {
      this.animateLight(bFocused);
    }, bFocused ? 0 : 300);
  }

  onQueryChanged(e) {
    this.setState({ pickerOpen: false, serverError: null });
    const id = e.target.value && +e.target.value.trim();
    var sError = null;
    if ((!id || id < 0) && e.target.value.length) {
      sError = 'Only positive integers allowed';
    }
    this.setState({ queryString: e.target.value, error: sError });
  }

  idPicked(id) {
    if (id) {
      this.setState({ queryString: `${id}` }, () => {
        this.submitQuery();
      });
    }
    else {
      this.setState({ data: null, pickerOpen: false, queryString: '' });
    }
    this.queryInput.focus();
  }

  inputKeyPressed(e) {
    if (e.key === 'Enter') {
      this.submitQuery();
    }
  }

  hidePicker(e) {
    //Hode if clicked outside of the component
    if (e.target.id !== 'picker-btn' && this.state.pickerOpen) {
      this.setState({ pickerOpen: false });
    }
  }

  pickerToggle() {
    this.setState({ pickerOpen: !this.state.pickerOpen });
  }

  render() {
    var isValid = !this.state.error && this.state.queryString.trim().length > 0;
    return (
      <div className="container" onClick={this.hidePicker.bind(this)}>
        <div className="d-flex flex-column align-items-center">
          <div className="logo-container">
            <Logo />
          </div>

          <div className="input-container d-flex flex-column ">
            <span className="lbl-error text-danger">{this.state.serverError || this.state.error}</span>
            <div className="d-flex" style={{ position: 'relative' }}>
              <input type="text" id="txtQuery"
                placeholder="Search for Star Wars people by ID. eg: 15"
                value={this.state.queryString}
                className={[this.state.focused ? 'focused' : null, this.state.beamColor].join(' ')}
                onFocus={() => this.inputFocuseChanged(true)}
                onBlur={() => this.inputFocuseChanged(false)}
                onChange={this.onQueryChanged.bind(this)}
                onKeyPress={this.inputKeyPressed.bind(this)}
                ref={(input) => { this.queryInput = input; }}
              />

              <button type="button"
                disabled={!isValid}
                className={["btn-submit btn btn-secondary btn-lg", isValid ? null : "disabled"].join(" ")}
                onClick={this.submitQuery.bind(this)}>
                {this.state.apiBusy ? <i className="fa fa-refresh fa-spin"></i> : null}
                Submit
              </button>
              <Picker canClear={!!this.state.data} onSelect={this.idPicked.bind(this)} toggle={this.pickerToggle.bind(this)} isOpen={this.state.pickerOpen} />
            </div>

            <div id="light-saber-container" >
              <LightSaber on={this.state.inputFocus}
                color={this.state.beamColor}
                style={{ opacity: 0.8, marginTop: '10px' }} />
            </div>
          </div>
          <ResultView data={this.state.data} />
        </div>
      </div>
    )
  }
}


export default MainPage;