import { BuilderContextProvider } from "./components/context"

export default async function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BuilderContextProvider>{children}</BuilderContextProvider>
}
