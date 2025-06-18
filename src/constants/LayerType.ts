export const LayerType = {
  Background: "background",
  Enemy: "enemy",
  Player: "player",
  UI: "ui",
} as const;

export type LayerType = (typeof LayerType)[keyof typeof LayerType];
