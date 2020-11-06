import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { GestureController, IonCard, ModalController } from '@ionic/angular';
import { NPC } from '../../../models/npc';
import { SpellListModalPage } from '../modals/spell-list-modal/spell-list-modal.page';

@Component({
  selector: 'character-card',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss']
})
export class CharacterCardComponent implements AfterViewInit {
  @Input()
  npc: NPC
  @Input()
  srcList: string;

  @ViewChild(IonCard) cardElem: ElementRef<IonCard>;

  private lastOnStart: number = 0;
  private DOUBLE_CLICK_THRESHOLD: number = 500;

  constructor(
    private db: AngularFireDatabase,
    private modalController: ModalController,
    private gestureCtrl: GestureController
  ) {}

  ngAfterViewInit(): void {
    console.log(this.cardElem);
    const card = this.cardElem;
    this.enableDoubleClick(card);
  }

  private enableDoubleClick(card) {
    const gesture = this.gestureCtrl.create({
      el: card.el,
      threshold: 0,
      gestureName: 'doubleClick',
      onStart: () => { this.onStart(card) }
    });

    gesture.enable();
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

  private onStart(card) {
    const now = Date.now();

    if (Math.abs(now - this.lastOnStart) <= this.DOUBLE_CLICK_THRESHOLD) {
      this.openModal();
      this.lastOnStart = 0;
    } else {
      this.lastOnStart = now;
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SpellListModalPage,
      componentProps: {
        characterName: this.npc.name
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then(data => {
      console.log(JSON.stringify(data));
    });
    return await modal.present();
  }
}