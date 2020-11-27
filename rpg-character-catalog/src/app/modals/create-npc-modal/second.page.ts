import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NPC } from '../../../../models/npc';

@Component({
  selector: 'create-npc-form',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class CreateNpcModal implements OnInit {
  npc: NPC;
  formGroups = new FormGroup({
    npcFormGroup: new FormGroup({
      name: new FormControl(''),
      level: new FormControl(0, [
        Validators.min(0),
        Validators.max(20)
      ]),
      armorClass: new FormControl(0,
        [
          Validators.min(0)
        ]),
      description: new FormControl('', [
        Validators.minLength(0),
        Validators.maxLength(1000)
      ]),
      public: new FormControl(false)
    })
  });
  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
    this.npc = new NPC({});
  }

  async closeModal(): Promise<void> {
    await this.modalController.dismiss({
      npc: this.npc
    });
  }
}
