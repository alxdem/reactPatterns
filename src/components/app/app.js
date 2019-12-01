import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';

import './app.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
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
    >
      {(i) => (
        `${i.name} (${i.birthYear})`
      )}
    </ItemList>);

    const personRight = (
      <ItemDetails
        personId={this.state.selectedPerson}
      />
    );

    const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage
    } = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}
      />
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      />
    );

    return (
      <div className="stardb-app">
        <Header />
        <Row
          left={personDetails}
          right={starshipDetails}
        />

        {/*{ planet }*/}

        {/*<div className="row mb2 button-row">*/}
        {/*  <button*/}
        {/*    className="toggle-planet btn btn-warning btn-lg"*/}
        {/*    onClick={this.toggleRandomPlanet}>*/}
        {/*    Toggle Random Planet*/}
        {/*  </button>*/}
        {/*  <ErrorButton />*/}
        {/*</div>*/}

        {/*<PeoplePage />*/}

        {/*<Row left={personLeft} right={personRight}/>*/}

        {/*<div className="row mb2">*/}
        {/*  <div className="col-md-6">*/}
        {/*    <ItemList*/}
        {/*      onItemSelected={this.onPersonSelected}*/}
        {/*      getData={this.swapiService.getAllStarships}*/}
        {/*      renderItem={({name, model}) => `${name} (${model})`}*/}
        {/*    >*/}
        {/*      {(i) => (*/}
        {/*        `${i.name} (${i.birthYear})`*/}
        {/*      )}*/}
        {/*    </ItemList>*/}
        {/*  </div>*/}
        {/*  <div className="col-md-6">*/}
        {/*    <ItemDetails*/}
        {/*      personId={this.state.selectedPerson}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

      </div>
    );
  }
}
