import { Component, Input } from '@angular/core';
import { Spell } from '../../../models/spell';

@Component({
  selector: 'spell-card',
  templateUrl: './spell-card.page.html',
  styleUrls: ['./spell-card.page.scss']
})
export class SpellCardComponent {
  @Input() spell: Spell;

  constructor() {}
}