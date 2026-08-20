import { THINK_DOMAIN_PACK } from "./content/domains/think";
import { DISCOVER_DOMAIN_PACK } from "./content/domains/discover";
import { BUILD_DOMAIN_PACK } from "./content/domains/build";
import { CREATE_DOMAIN_PACK } from "./content/domains/create";
import { CONNECT_DOMAIN_PACK } from "./content/domains/connect";
import { MOVE_DOMAIN_PACK } from "./content/domains/move";
import { THINK_DISCOVER_COMBINATION_PACK } from "./content/combinations/think-discover";
import { THINK_BUILD_COMBINATION_PACK } from "./content/combinations/think-build";
import { THINK_CREATE_COMBINATION_PACK } from "./content/combinations/think-create";
import { THINK_CONNECT_COMBINATION_PACK } from "./content/combinations/think-connect";
import { THINK_MOVE_COMBINATION_PACK } from "./content/combinations/think-move";
import { DISCOVER_BUILD_COMBINATION_PACK } from "./content/combinations/discover-build";
import { DISCOVER_CREATE_COMBINATION_PACK } from "./content/combinations/discover-create";
import { DISCOVER_CONNECT_COMBINATION_PACK } from "./content/combinations/discover-connect";
import { DISCOVER_MOVE_COMBINATION_PACK } from "./content/combinations/discover-move";
import { BUILD_CREATE_COMBINATION_PACK } from "./content/combinations/build-create";
import { BUILD_CONNECT_COMBINATION_PACK } from "./content/combinations/build-connect";
import { BUILD_MOVE_COMBINATION_PACK } from "./content/combinations/build-move";
import { CREATE_CONNECT_COMBINATION_PACK } from "./content/combinations/create-connect";
import { CREATE_MOVE_COMBINATION_PACK } from "./content/combinations/create-move";
import { CONNECT_MOVE_COMBINATION_PACK } from "./content/combinations/connect-move";
import type { K912CombinationPack, K912DomainPack, K912ReportDomainId } from "./types";
import type { K912CombinationKey } from "./rules/combination-resolver";

export const K912_DOMAIN_PACKS: Readonly<Record<K912ReportDomainId, K912DomainPack>> = {
  think: THINK_DOMAIN_PACK, discover: DISCOVER_DOMAIN_PACK, build: BUILD_DOMAIN_PACK,
  create: CREATE_DOMAIN_PACK, connect: CONNECT_DOMAIN_PACK, move: MOVE_DOMAIN_PACK,
};

export const K912_COMBINATION_PACKS: Readonly<Record<K912CombinationKey, K912CombinationPack>> = {
  "think-discover": THINK_DISCOVER_COMBINATION_PACK, "think-build": THINK_BUILD_COMBINATION_PACK,
  "think-create": THINK_CREATE_COMBINATION_PACK, "think-connect": THINK_CONNECT_COMBINATION_PACK,
  "think-move": THINK_MOVE_COMBINATION_PACK, "discover-build": DISCOVER_BUILD_COMBINATION_PACK,
  "discover-create": DISCOVER_CREATE_COMBINATION_PACK, "discover-connect": DISCOVER_CONNECT_COMBINATION_PACK,
  "discover-move": DISCOVER_MOVE_COMBINATION_PACK, "build-create": BUILD_CREATE_COMBINATION_PACK,
  "build-connect": BUILD_CONNECT_COMBINATION_PACK, "build-move": BUILD_MOVE_COMBINATION_PACK,
  "create-connect": CREATE_CONNECT_COMBINATION_PACK, "create-move": CREATE_MOVE_COMBINATION_PACK,
  "connect-move": CONNECT_MOVE_COMBINATION_PACK,
};
