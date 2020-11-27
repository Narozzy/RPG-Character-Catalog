import { Component, ElementRef } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CreateNpcModal } from '../modals/create-npc-modal/second.page';
import { NPC } from '../../../models/npc';
import { AngularFireDatabase } from '@angular/fire/database';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dm-view',
  templateUrl: 'dm-view.page.html',
  styleUrls: ['./dm-view.page.scss']
})
export class DmViewComponent {
  private newNPC: NPC
  public npcDatabase;
  public groupDatabase;

  constructor(
    private modalController: ModalController,
    private db: AngularFireDatabase,
    private elemRef: ElementRef
  ) {
    this.npcDatabase = this.db.list<NPC>('/npcs', ref => ref.orderByChild('position'))
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

  async openModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateNpcModal,
      componentProps: this.newNPC,
      backdropDismiss: false
    });

    modal.onDidDismiss().then(data => {
      console.log(JSON.stringify(data));
      console.dir(this.npcDatabase);
      if (data) {
        data.data.npc.position = document.getElementById('availableCharacterList').parentElement.children.length + 1;
        this.db.list('npcs').push(data.data.npc);
      }
    });
    return modal.present();
  }

  organizeNpcs(event: CdkDragDrop<NPC[]>): void {
    console.log(event);
    const source = event.previousContainer.id === 'cdk-drop-list-0' ? 'npcs/' : 'groups/';
    if (event.container.id === event.previousContainer.id) {
      // Hello
    } else {
      const destination = event.container.id === 'cdk-drop-list-0' ? 'npcs/' : 'groups/';
      this.db.list(`${source}${event.item.data.npcID}`).remove();
      this.db.list(`${destination}`).push(event.item.data);
    }
  }

  determineBoxStyling(collection: string): string {
    const isCollectionEmpty = collection === 'npcs' ? this.elemRef.nativeElement.querySelectorAll('div')[0]?.childNodes.length === 0 : this.elemRef.nativeElement.querySelectorAll('div')[1]?.childNodes.length === 0;
    if (isCollectionEmpty) {
      return 'emptyBox';
    } else {
      return 'box';
    }
  }

  handleScrollWheel(event: any): void {
    const npcScrollList = document.getElementsByTagName('ion-segment')[0];
    if (event.path.includes(npcScrollList) && event.deltaY > 0) {
      npcScrollList.scrollLeft += 75;
    } else if (event.path.includes(npcScrollList) && event.deltaY < 0) {
      npcScrollList.scrollLeft -= 75;
    }
  }
}