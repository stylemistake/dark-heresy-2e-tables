import Entity from './Entity.js';

export default class Character extends Entity {

  constructor(data) {
    super();
    this.type = 'character';
    this.name = 'Rufus Kaynedor';
    this.characteristics = {
      ws: 28,
      bs: 38,
      s: 33,
      t: 34,
      ag: 34,
      int: 45,
      per: 33,
      wp: 39,
      fel: 42,
      status: 44,
      inf: 44,
      wounds: 11,
      fp: 4,
    };
    this.state = {
      damage: 0,
      fatigue: 0,
      corruption: 0,
      stress: 0,
      fate: 4,
      experience: 2600,
    };
    this.inventory = [];
    this.skills = [
      {
        name: 'Awareness',
        tier: 1,
      },
      {
        name: 'Charm',
        tier: 3,
      },
      {
        name: 'Medicae',
        tier: 5,
      },
      {
        name: 'Dodge',
        tier: 2,
      },
    ];
    this.talents = [
      {
        name: 'Weapon Training [Las]',
      },
    ];
    Object.assign(this, data)
  }

  getSkills() {
    return this.skills;
  }

}