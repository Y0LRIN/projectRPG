import { HealingObjects, ManaObjects } from "./objects.ts";

export const healPotion = new HealingObjects(
    'Healing Potion', 
    'Heals 50% of the health for one user', 
    1, 
    50, 
    0
);

export const starShard = new HealingObjects(
    'Star Shard',
    'Resurrects a user with 20% of their health, or heals them by 50%',
    1,
    50,
    20
);

export const halfStar = new HealingObjects(
    'Half Star',
    'Heals its user to their fullest, wether they are dead or alive',
    1,
    100,
    100
);

export const ether = new ManaObjects(
    'Ether',
    'Restores 30% of the mana for one user',
    1,
    30,
)