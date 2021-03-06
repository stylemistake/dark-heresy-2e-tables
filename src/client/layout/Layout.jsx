import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, routerActions, selectors } from '../store';

import IndexPage from '../views/IndexPage.jsx';
import GameState from '../views/GameState.jsx';
import CharacterSheet from '../views/CharacterSheet.jsx';
import CharacterXp from '../views/CharacterXp.jsx';
import CharacterCharcs from '../views/CharacterCharcs.jsx';
import CharacterAptitudes from '../views/CharacterAptitudes.jsx';
import CharacterSkills from '../views/CharacterSkills.jsx';
import CharacterTalents from '../views/CharacterTalents.jsx';
import Seach from '../views/Search.jsx';

import NotFound from '../views/NotFound.jsx';

import { Dropdown, Menu } from 'semantic-ui-react'

@connect(state => ({
  route: state.getIn(['router', 'route']),
}), dispatch => ({
  router: bindActionCreators(routerActions, dispatch),
  actions: bindActionCreators(actions, dispatch),
}))
export default class Layout extends Component {

  getRoutedComponent() {
    const { route } = this.props;
    if (!route) {
      return <NotFound />
    }
    const { name, params } = route;
    if (name === 'index') {
      return <IndexPage />
    }
    if (name === 'gameState') {
      return <GameState
        gameStateId={params.gameStateId} />
    }
    if (name === 'character') {
      return <CharacterSheet
        characterId={params.characterId} />
    }
    if (name === 'character.xp') {
      return <CharacterXp
        characterId={params.characterId} />
    }
    if (name === 'character.charcs') {
      return <CharacterCharcs
        characterId={params.characterId} />
    }
    if (name === 'character.aptitudes') {
      return <CharacterAptitudes
        characterId={params.characterId} />
    }
    if (name === 'character.skills') {
      return <CharacterSkills
        characterId={params.characterId} />
    }
    if (name === 'character.talents') {
      return <CharacterTalents
        characterId={params.characterId} />
    }
    return <NotFound />
  }

  render() {
    const { actions, router, route } = this.props;

    const component = this.getRoutedComponent();

    return (
      <div className="Layout react-container" style={{ height: '100vh' }} onClick={(e) => {
        this.searchNode && !this.searchNode.getWrappedInstance().searchNode.contains(e.target) && actions.searchQuery('')
      }}>
        <div className="header">
          <div className="header-item ">
            <Dropdown text='Holy Rulebook' className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                  router.navigateTo('index');
                }}>Home</Dropdown.Item>
                {route && route.name === 'index' && <Dropdown.Item onClick={() => actions.createGameState()}>New Gamestate</Dropdown.Item>}
                {route && route.params && route.params.gameStateId && <Dropdown.Item onClick={() => {
                  actions.createCharacter(route.params.gameStateId)
                }}>New Character</Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="header-item header-search">
            <Seach ref={node => this.searchNode = node} />
          </div>
        </div>

        <div className="layout" style={{ height: 'calc(100% - 38px)', overflowY: 'auto' }}>
          {component}
        </div>
      </div>
    );

    /*
    return (
      <div className="Layout react-container">
        <div className="Layout__header header">
          <div className="header-item header-title">
            Holy Rulebook
          </div>
          <div className="header-item header-search">
            <input
              placeholder="Search..."
              onChange={(e) => actions.searchQuery(e.target.value)} />
          </div>
        </div>

        <div className="Layout__sidebar sidebar">
          <SidebarItem group={true} title="Gamestates">
            <SidebarItemIcon icon="add"
              onClick={() => actions.createGameState()} />
          </SidebarItem>
          {gameStates.map((gameState) => {
            const id = gameState.get('id');
            return <SidebarItem key={id}
              title={gameState.get('name')}
              active={gameState === activeGameState}
              onClick={() => actions.selectGameState(id)}>
            </SidebarItem>
          })}
          {activeGameState && (
            <SidebarItem group={true} title="Characters">
              <SidebarItemIcon icon="add"
                onClick={() => actions.createCharacter()} />
            </SidebarItem>
          )}
          {characters.map((character) => {
            const id = character.get('id');
            return <SidebarItem key={id}
              title={character.get('name')}
              active={activeCharacter === character}
              onClick={() => actions.selectCharacter(id)}>
              <SidebarItemIcon icon="remove"
                onClick={(e) => {
                  actions.removeCharacter(id);
                  e.stopPropagation();
                }} />
            </SidebarItem>
          })}
          <SidebarItem group={true} title="Settings">
            <SidebarItem title="Purge state"
              onClick={() => actions.purgeState()} />
          </SidebarItem>
        </div>

        <div className="Layout__content">
          {activeCharacter && (
            <CharacterSheet characterId={activeCharacter.get('id')} />
          )}
        </div>

        <DetailsPane className="Layout__details" />
      </div>
    );
    */
  }
}
