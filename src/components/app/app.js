import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';

import './app.css';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const personLeft = (<ItemList
      onItemSelected={this.onPersonSelected}
      getData={this.swapiService.getAllPlanets}
      renderItem={({name}) => (<span>{name} <button>!</button></span>)}
    />);

    const personRight = (
      <PersonDetails
        personId={this.state.selectedPerson}
      />
    );

    return (
      <div className="stardb-app">
        <Header />
        { planet }

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

        <PeoplePage />

        <Row left={personLeft} right={personRight}/>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={({name, model}) => `${name} (${model})`}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails
              personId={this.state.selectedPerson}
            />
          </div>
        </div>

      </div>
    );
  }
}
