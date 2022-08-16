import { doc, setDoc } from "firebase/firestore"
import { Role } from "../auth"
import { firestore } from "../firebase"

export type UpgradeRequest = {
  role: Role
}

const upgradeRequestRef = (uid: string) =>
  doc(firestore, `/upgradeRequests/${uid}`)

export function createUpgradeRequest(uid: string, role: Role) {
  return setDoc(upgradeRequestRef(uid), { role }, { merge: true })
}
