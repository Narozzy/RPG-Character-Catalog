import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CreateNpcModal } from '../modals/create-npc-modal/second.page';
import { NPC } from '../../../models/npc';
import { AngularFireDatabase } from '@angular/fire/database';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ɵAnimationRendererFactory } from '@angular/platform-browser/animations';

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
    this.npcDatabase.subscribe((newNpcs: Map<string, NPC>) => {
      console.log(JSON.stringify(newNpcs));
      console.log(`this.currentGroup ${JSON.stringify(this.currentGroup)} | this.npcs ${JSON.stringify(this.npcs)}`)
      for (const updatedNpcId in newNpcs) {
        if (updatedNpcId === 'undefined') { continue }
        if (!(updatedNpcId in this.npcs || this.currentGroup.filter(npc => npc.npcID === newNpcs[updatedNpcId].npcID).length > 0)) {
          console.log('Inside condition to create things');
          let o = new NPC(newNpcs[updatedNpcId]);
          o.npcID = updatedNpcId;
          this.npcs.set(updatedNpcId, o);
        }
      }
      console.log(Object.entries(newNpcs));
      this.currentGroup = Object.entries(newNpcs).filter(
        npcEntry => !(Array.from(this.npcs.keys()).includes(npcEntry[1].npcID))
      ).map(npcEntry => {
        console.log(npcEntry[0]);
        console.log(`npcEntry[1]: ${JSON.stringify(npcEntry)}`);
        const o = new NPC(npcEntry[1]);
        o.npcID = npcEntry[0];
        return o;
      });
      console.log(this.currentGroup);
    });
  }

  organizeNpcs(event: CdkDragDrop<NPC[]>) {
    console.log(event);
    if (event.container.id === event.previousContainer.id) {
      event.container.id === 'cdk-drop-list-0' ? this.reorderNpcMap(event.currentIndex, event.previousIndex) : moveItemInArray(this.currentGroup, event.previousIndex, event.currentIndex);
    } else {
      event.previousContainer.id === 'cdk-drop-list-0' ? this.switchNpcFromAvailableToGroup(event) : this.switchNpcFromGroupToAvailable(event);
    }
  }

  private reorderNpcMap(currIndex, prevIndex) {
    let npcsEntries = Array.from(this.npcs.entries());
    let prevObj = npcsEntries[prevIndex];
    npcsEntries[prevIndex] = npcsEntries[currIndex];
    npcsEntries[currIndex] = prevObj;
    this.npcs = new Map<string, NPC>([...npcsEntries]);
  }

  private switchNpcFromAvailableToGroup(event: CdkDragDrop<NPC[]>) {
    const sourceList: Array<[string, NPC]> = Array.from(this.npcs.entries());
    const destinationList = this.currentGroup;
    const npcToMove = sourceList[event.previousIndex];
    destinationList.push(npcToMove[1]);
    sourceList.splice(event.previousIndex, 1);
    this.npcs = new Map<string, NPC>([...sourceList]);
    this.currentGroup = destinationList;
  }

  private switchNpcFromGroupToAvailable(event: CdkDragDrop<NPC[]>) {
    const destinationList: Array<[string, NPC]> = Array.from(this.npcs.entries());
    const sourceList = this.currentGroup;
    const npcToMove: NPC = sourceList[event.previousIndex];
    console.log(npcToMove);
    destinationList.push([npcToMove.npcID, npcToMove]);
    sourceList.splice(event.previousIndex, 1);
    this.npcs = new Map<string, NPC>([...destinationList]);
    this.currentGroup = sourceList;
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