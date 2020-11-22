export interface Spell {
  castingTime: string;
  classes: string[];
  components: Components;
  description: string;
  duration: string;
  higherLevels: string;
  level: string;
  name: string;
  range: string;
  ritual: boolean;
  school: string;
  tags: string[];
  type: string;
}

export interface Components {
  material: boolean;
  materialsNeeded: string[];
  raw: string;
  somatic: boolean;
  verbal: boolean;
}