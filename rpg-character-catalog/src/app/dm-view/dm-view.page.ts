import { Component, OnInit } from "@angular/core";
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
    private db: AngularFireDatabase
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

  // private async grabUpdate() {
  //   this.npcDatabase.subscribe((newNpcs: Map<string, NPC>) => {
  //     console.log(JSON.stringify(newNpcs));
  //     for (const updatedNpcId in newNpcs) {
  //       if (!(this.npcs.filter(npc => npc.npcID === newNpcs[updatedNpcId].npcID).length > 0 ||
  //         this.currentGroup.filter(npc => npc.npcID === newNpcs[updatedNpcId].npcID).length > 0)) {
  //         let o = new NPC(newNpcs[updatedNpcId]);
  //         o.npcID = updatedNpcId;
  //         this.npcs.push(o);
  //       }
  //     }

  //     this.currentGroup = Object.entries(newNpcs).filter(
  //       npcEntry => !(this.npcs.includes(npcEntry[1].npcID))
  //     ).map(npcEntry => {
  //       const o = new NPC(npcEntry[1]);
  //       o.npcID = npcEntry[0];
  //       return o;
  //     });
  //   });
  // }

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

  handleScrollWheel(event) {
    const npcScrollList = document.getElementsByTagName('ion-segment')[0];
    if (event.path.includes(npcScrollList) && event.deltaY > 0) {
      npcScrollList.scrollLeft += 75;
    } else if (event.path.includes(npcScrollList) && event.deltaY < 0) {
      npcScrollList.scrollLeft -= 75;
    }
  }
}