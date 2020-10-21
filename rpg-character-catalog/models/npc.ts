export class NPC {
  name: string;
  level: number;
  armorClass: number;
  description: string = '';
  public: boolean;

  npcID: string;

  constructor(npc: any) {
    this.name = npc.name;
    this.level = npc.level ?? 1;
    this.armorClass = npc.armorClass ?? 1;
    this.description = npc.description;
    this.public = npc.public ?? false;
  }
}