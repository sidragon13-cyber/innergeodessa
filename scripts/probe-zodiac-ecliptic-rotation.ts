import {
  Rotation_EQD_ECL,
} from "astronomy-engine";

const date =
  new Date("2026-07-30T12:00:00.000Z");

const rotation =
  Rotation_EQD_ECL(date);

console.dir(
  rotation,
  {
    depth: null,
  },
);
