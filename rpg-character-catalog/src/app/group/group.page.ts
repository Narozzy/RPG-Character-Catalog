import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Output, EventEmitter, Input } from "@angular/core";
import { NPC } from '../../../models/npc';

@Component({
  selector: 'dm-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss']
})
export class GroupComponent {
  @Output()
  groupModificationEvent = new EventEmitter<NPC[]>();

  @Input()
  currentGroup: NPC[];

  npcDropped(event: CdkDragDrop<NPC[]>) {
    console.log(event);
    if (event.previousContainer.id === event.container.id) {
      console.log(`This is the same id: ${JSON.stringify(event.previousContainer)}`)
    }
    this.groupModificationEvent.emit(this.currentGroup);
    moveItemInArray(this.currentGroup, event.previousIndex, event.currentIndex);
  }
}