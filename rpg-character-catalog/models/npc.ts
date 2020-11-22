import { Spell } from './spell';

export class NPC {
  name: string;
  level: number;
  armorClass: number;
  description: string = '';
  public: boolean;
  spells: Spell[];
  npcID: string;
  position: number;

  constructor(npc: any) {
    this.name = npc.name;
    this.level = npc.level ?? 1;
    this.armorClass = npc.armorClass ?? 1;
    this.description = npc.description;
    this.public = npc.public ?? false;
    this.spells = npc.spells ?? [];
    this.position = npc.position;
  }
}