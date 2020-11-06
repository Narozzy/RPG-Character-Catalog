import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CreateNpcModal } from '../modals/create-npc-modal/second.page';
import { NPC } from '../../../models/npc';
import { AngularFireDatabase } from '@angular/fire/database';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dm-view',
  templateUrl: 'dm-view.page.html',
  styleUrls: ['./dm-view.page.scss']
})
export class DmViewComponent {
  private newNPC: NPC
  npcDatabase;
  groupDatabase;
  
  npcs: Array<NPC> = [];
  currentGroup: Array<NPC> = [];

  constructor(
    private modalController: ModalController,
    private db: AngularFireDatabase,
    private elemRef: ElementRef
  ) {
    this.npcDatabase = this.db.list<NPC>('/npcs')
      .snapshotChanges()
      .pipe(map(npcs =>
         npcs.map(npc => this.documentToDomainObject(npc))
      ));
    this.groupDatabase = this.db.list<NPC>('/groups')
      .snapshotChanges()
      .pipe(map(npcs =>
        npcs.map(npc => this.documentToDomainObject(npc))
      ));
  }

  private documentToDomainObject = _ => {
    const object = new NPC(_.payload.toJSON());
    object.npcID = _.key;
    return object;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateNpcModal,
      componentProps: this.newNPC,
      backdropDismiss: false
    });

    modal.onDidDismiss().then(data => {
      console.log(JSON.stringify(data));
      console.dir(this.npcDatabase);
      if (data) {
        this.db.list('npcs').push(data.data.npc);
      }
      // this.grabUpdate();
    });
    return await modal.present();
  }

  organizeNpcs(event: CdkDragDrop<NPC[]>) {
    console.log(event);
    if (event.container.id === event.previousContainer.id) {
      const source = event.previousContainer.id === 'cdk-drop-list-0' ? this.npcDatabase : this.groupDatabase;
      // moveItemInArray(source, event.previousIndex, event.currentIndex);
    } else {
      const source = event.previousContainer.id === 'cdk-drop-list-0' ? 'npcs/' : 'groups/';
      const destination = event.container.id === 'cdk-drop-list-0' ? 'npcs/' : 'groups/';
      this.db.list(`${source}${event.item.data.npcID}`).remove();
      this.db.list(`${destination}`).push(event.item.data);
    }
  }

  determineBoxStyling(collection: string) {
    const isCollectionEmpty = collection === 'npcs' ? this.elemRef.nativeElement.querySelectorAll('div')[0]?.childNodes.length === 0 : this.elemRef.nativeElement.querySelectorAll('div')[1]?.childNodes.length === 0;
    if (isCollectionEmpty) {
      return 'emptyBox';
    } else {
      return 'box';
    }
  }

  handleScrollWheel(event) {
    const npcScrollList = document.getElementsByTagName('ion-segment')[0];
    if (event.path.includes(npcScrollList) && event.deltaY > 0) {
      npcScrollList.scrollLeft += 75;
    } else if (event.path.includes(npcScrollList) && event.deltaY < 0) {
      npcScrollList.scrollLeft -= 75;
    }
  }
}