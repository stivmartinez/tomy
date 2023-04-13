export default async function ProfileLayout({
  children,
  editor,
}: {
  children: React.ReactNode
  editor?: any
}) {
  return (
    <>
      {children}
      {editor}
    </>
  )
}
