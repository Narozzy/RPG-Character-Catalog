import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-spell-list-modal',
  templateUrl: './spell-list-modal.page.html',
  styleUrls: ['./spell-list-modal.page.scss'],
})
export class SpellListModalPage implements OnInit {
  @Input() characterName: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}
