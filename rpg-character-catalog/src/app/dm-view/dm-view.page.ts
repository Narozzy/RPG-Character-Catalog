import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CreateNpcModal } from '../modals/create-npc-modal/second.page';
import { NPC } from '../../../models/npc';
import { AngularFireDatabase } from '@angular/fire/database';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'dm-view',
  templateUrl: 'dm-view.page.html',
  styleUrls: ['./dm-view.page.scss']
})
export class DmViewComponent implements OnInit {
  private newNPC: NPC
  private npcDatabase;
  
  npcs: Map<string, NPC> = new Map<string, NPC>();
  npcList: NPC[] = [];
  currentGroup: NPC[] = [];

  constructor(
    private modalController: ModalController,
    private db: AngularFireDatabase
  ) {
    this.npcDatabase = this.db.object('npcs').valueChanges();
  }

  ngOnInit() {
    this.grabUpdate();
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
      this.grabUpdate();
    });
    return await modal.present();
  }

  private async grabUpdate() {
    this.npcDatabase.subscribe(newNpcs => {
      console.log(this.npcs);
      for (const updatedNpcId in newNpcs) {
        if (!(updatedNpcId in this.npcs)) {
          let o = new NPC(newNpcs[updatedNpcId]);
          o.npcID = updatedNpcId;
          this.npcs.set(updatedNpcId, o);
        }
      }
      console.log(this.npcs);
    });
    console.log(this.npcs);
  }

  organizeNpcs(event: CdkDragDrop<NPC[]>) {
    console.log(event);
    if (event.container.id === event.previousContainer.id) {
      this.reorderNpcMap(event.currentIndex, event.previousIndex);
    } else {
      transferArrayItem(Array.from(this.npcs.values()), this.currentGroup, event.previousIndex, event.currentIndex);
    }
  }

  private reorderNpcMap(currIndex, prevIndex) {
    let npcsEntries = Array.from(this.npcs.entries());
    let prevObj = npcsEntries[prevIndex];
    npcsEntries[prevIndex] = npcsEntries[currIndex];
    npcsEntries[currIndex] = prevObj;
    this.npcs = new Map<string, NPC>([...npcsEntries]);
  }

  getValues(map) {
    return Array.from(map.values());
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