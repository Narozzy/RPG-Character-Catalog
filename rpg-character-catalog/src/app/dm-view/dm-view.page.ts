import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CreateNpcModal } from '../modals/create-npc-modal/second.page';
import { NPC } from '../../../models/npc';
import { AngularFireDatabase } from '@angular/fire/database';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
      for (const updatedNpcId in newNpcs) {
        if (!(updatedNpcId in this.npcs)) {
          let o = new NPC(newNpcs[updatedNpcId]);
          o.npcID = updatedNpcId;
          this.npcs.set(updatedNpcId, o);
          this.npcList.push(newNpcs[updatedNpcId]);
        }
      }
    });
    console.log(this.npcs);
    console.log(this.npcList);
  }

  organizeNpcs(event: CdkDragDrop<NPC[]>) {
    console.log(event);
    moveItemInArray(this.npcList, event.previousIndex, event.currentIndex);
  }
}