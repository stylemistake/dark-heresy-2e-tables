import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { flatConnect, actions, routerActions, selectors } from '../store';
import { mapValueToColorScale } from '../color.js';
import { classes } from '../utils.js';
import CharacterXpControl from './CharacterXpControl.jsx';

export default flatConnect(
  (state, props) => ({
    character: selectors.getCharacter(state, props.characterId),
    gameStateId: selectors.getCharacterGameStateId(state, props.characterId),
    talents: selectors.getCharacterTalents(state, props.characterId)
      .sortBy(talent => talent.get('tier'))
      .sortBy(talent => -talent.get('matchingApts')),
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    router: bindActionCreators(routerActions, dispatch),
  }),
  function CharacterTalents(props) {
    const {
      characterId, character, gameStateId, talents,
      actions, router,
    } = props;
    if (!character) {
      return null;
    }
    return (
      <Fragment>
        <div className="Layout__content-padding">
          <CharacterXpControl characterId={characterId} />
          <table className="GenericTable">
            <thead>
              <tr>
                <th>Talent</th>
                <th><abbr title="Tier">T</abbr></th>
                <th><abbr title="Purchases">P</abbr></th>
                <th></th>
                <th className="text-center">Cost</th>
                <th></th>
                <th>Aptitudes</th>
                <th><abbr title="Matching aptitudes">M</abbr></th>
              </tr>
            </thead>
            <tbody>
              {talents.map(talent => (
                <tr key={talent.hashCode()}
                  className={classes({
                    'GenericTable__row--dimmed': talent.get('purchaseCount') === 0,
                    'GenericTable__row--highlighted': talent.get('purchaseCount') > 0,
                  })}>
                  <th>{talent.get('displayName')}</th>
                  <th className="GenericTable__statistic text-center">
                    {talent.get('tier')}
                  </th>
                  <th className="GenericTable__statistic text-center">
                    {talent.get('purchaseCount')}
                  </th>
                  <td className="cursor-pointer"
                    onClick={() => {
                      actions.refundTalent(characterId,
                        talent.get('name'),
                        talent.get('specialization'));
                    }}>
                    <i className="icon minus fitted" />
                  </td>
                  <td className="text-center"
                    style={{
                      backgroundColor: mapValueToColorScale(talent.get('cost') || 9999, {
                        green: 100,
                        yellow: 750,
                        red: 2500,
                      }),
                    }}>
                    {talent.get('cost') || '--'}
                  </td>
                  <td className="cursor-pointer"
                    onClick={() => {
                      actions.buyTalent(characterId,
                        talent.get('name'),
                        talent.get('specialization'),
                        talent.get('cost'));
                    }}>
                    <i className="icon plus fitted" />
                  </td>
                  <td>{talent.get('aptitudes').join(', ')}</td>
                  <td className="text-center">{talent.get('matchingApts')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
);
