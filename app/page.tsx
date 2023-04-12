import React from "react"

import { fetchBody } from "@/lib/api/body"
import { fetchFooter } from "@/lib/api/footer"
import { fetchHeader } from "@/lib/api/header"
import CustomPage from "@/components/CustomPage"

export default async function Home() {
  const header = await fetchHeader()
  const body = await fetchBody()
  const footer = await fetchFooter()

  return <CustomPage initialData={[header.header, body.body, footer.footer]} />
}
