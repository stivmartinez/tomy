import { getLocale } from "@/locales"

import Landing from "@/components/landing"
import StyledContainer from "@/components/styled/container"

export default async function Home({
  params: { lang },
}: {
  params: { lang: "en" | "es" }
}) {
  const t = await getLocale(lang)

  return (
    <StyledContainer>
      <Landing t={t} />
    </StyledContainer>
  )
}
