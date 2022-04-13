import { Timestamp } from "firebase/firestore"
import { Testimony } from "../functions/src/testimony/types"
import { Bill, BillContent } from "./db"

const billIdFormat = /^(?<chamber>\D+)(?<number>\d+)$/

/** Formats H123 as H.123 */
export const formatBillId = (id: string) => {
  const match = billIdFormat.exec(id)
  if (!match?.groups) {
    return id
  } else {
    return `${match.groups.chamber}.${match.groups.number}`
  }
}

const MISSING_TIMESTAMP = Timestamp.fromMillis(0)
export const formatHearingDate = (t?: Timestamp) => {
  if (!t || t.toMillis() == MISSING_TIMESTAMP.toMillis()) {
    return undefined
  }
  return t.toDate().toLocaleDateString()
}

export const FormattedBillTitle = ({ bill }: { bill: Bill | BillContent }) => {
  const billInfo = "content" in bill ? bill.content : bill

  const { BillNumber, Title } = billInfo

  return (
    <div className="mt-2">
      {formatBillId(BillNumber)}: {Title}
    </div>
  )
}

export const FormattedTestimonyTitle = ({
  testimony
}: {
  testimony: Testimony
}) => {
  const { authorDisplayName, publishedAt, position } = testimony

  return (
    <div>
      <span><b>Author:</b> {authorDisplayName || "anonymous"}</span><br></br>
      <span><b>Published on:</b> {publishedAt.toDate().toLocaleDateString()}</span><br></br>
      <span><b>Position:</b> {position}</span>
    </div>
  )
}
