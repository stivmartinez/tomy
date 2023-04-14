import { fetchBody } from "@/lib/api/body"
import ProfileEditor from "./profile-editor"

export default async function ProfilePageEditor() {
  const body = await fetchBody()
  return <ProfileEditor initialData={[body.body]} />
}
