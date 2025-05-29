import { isMobile } from "pixi.js";

export const runtimeFlags = {
  isDevMode: import.meta.env.MODE !== "production",
  isMobile: isMobile.any,
};
