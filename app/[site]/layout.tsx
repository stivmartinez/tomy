export default async function BuilderLayout({
  children,
  builder,
}: {
  children: React.ReactNode
  builder?: any
}) {
  return (
    <>
      {children}
      {builder}
    </>
  )
}
