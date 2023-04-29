import { headerDummy } from "@/utils/headerDummy"

import Builder from "./builder"

export default async function BuilderPage() {
  return <Builder initialData={[headerDummy]} />
}
