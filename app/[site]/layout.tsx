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
    <>
      {children}
      {site}
    </>
  )
}
