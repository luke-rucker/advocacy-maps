import { Record, Static } from "runtypes"
import { Role } from "../auth/types"

export const UpgradeRequest = Record({
  role: Role
})
export type UpgradeRequest = Static<typeof UpgradeRequest>
