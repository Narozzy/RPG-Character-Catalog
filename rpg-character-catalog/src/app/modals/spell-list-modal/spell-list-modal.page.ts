import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { NPC } from '../../../../models/npc';
import { Spell } from '../../../../models/spell';

@Component({
  selector: 'app-spell-list-modal',
  templateUrl: './spell-list-modal.page.html',
  styleUrls: ['./spell-list-modal.page.scss'],
})
export class SpellListModalPage implements OnInit {
  @Input() characterName: string;
  @Input() character: NPC;
  @ViewChild("ion-searchbar") searchbar;

  spellList: Spell[];
  rowGridStyle: string;
  selectedSpells: Spell[];

  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore
  ) {
    this.firestore.collection<Spell>('spells', ref => ref.orderBy('level', 'asc')).valueChanges().subscribe(o => this.spellList = o);
   }

  ngOnInit() {
    this.selectedSpells = Array.from(Object.values(this.character.spells)) ?? [];
  }

  async closeModal() {
    await this.modalController.dismiss({
      data: this.selectedSpells
    });
  }

  filterList(event) {
    const items = Array.from(document.querySelectorAll('ion-label[name="spellName"]')) as HTMLElement[];
    this.rowGridStyle = this.rowGridStyle ?? items.filter((item) => item.parentElement.parentElement.style.display !== 'none')[0].style.display;
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.parentElement.parentElement.style.display = shouldShow ? this.rowGridStyle : 'none';
      });
    });
  }

  changeSelectedSpells(event, spell: Spell) {
    if (event.detail.checked) {
      this.selectedSpells.push(spell);
    } else {
      this.selectedSpells.filter((selectedSpell) => selectedSpell.name !== spell.name);
    }
  }

  public spellSelected = (spell: Spell) => this.selectedSpells.map(selectedSpell => selectedSpell.name).includes(spell.name);

  public filterSelected() {
    const items = Array.from(document.querySelectorAll('ion-checkbox[name="selected"]')) as HTMLIonCheckboxElement[];
    this.rowGridStyle = this.rowGridStyle ?? items.filter((item) => item.parentElement.parentElement.parentElement.style.display !== 'none')[0].style.display;
    requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.checked;
        item.parentElement.parentElement.style.display = shouldShow ? this.rowGridStyle : 'none';
      });
    });
  }
}
