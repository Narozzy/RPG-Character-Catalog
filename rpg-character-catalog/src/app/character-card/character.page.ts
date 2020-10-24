import { Component, Input, OnInit } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { NPC } from '../../../models/npc';

@Component({
  selector: 'character-card',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input()
  npc: NPC

  constructor(
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    console.log(this.npc);
  }

  determineStyle() {
    return this.npc.public ? 'success' : 'danger';
  }

  updatePublicStatus(event) {
    console.log(event);
    console.log(`this.npc.npcID: ${this.npc.npcID}`);
    this.npc.public = !this.npc.public;
    this.db.object(`npcs/${this.npc.npcID}`).update(this.npc);
  }

  dragEnded(event) {
    console.log(event);
  }
}