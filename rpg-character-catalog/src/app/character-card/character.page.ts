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
  @Input()
  srcList: string;

  constructor(
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    
  }

  determineStyle() {
    return this.npc.public ? 'success' : 'danger';
  }

  updatePublicStatus(event) {
    this.npc.public = !this.npc.public;
    this.db.object(`${this.srcList}/${this.npc.npcID}`).update(this.npc);
  }

  deleteCharacter(event) {
    console.log(event);
    this.db.object(`${this.srcList}/${this.npc.npcID}`).remove();
  }

  dragEnded(event) {
    console.log(event);
  }
}