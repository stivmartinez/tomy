import { BuilderContextProvider } from "./@builder/context"

export default async function BuilderLayout({
  children,
  builder,
  site,
}: {
  children: React.ReactNode
  builder?: any
  site?: any
}) {
  return (
    <BuilderContextProvider>
      {children}
      {builder}
    </BuilderContextProvider>
  )
}
