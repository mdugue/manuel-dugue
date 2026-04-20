export default function Layout({
  children,
  modal2,
}: Readonly<{
  children: React.ReactNode
  modal2: React.ReactNode
}>) {
  return (
    <div>
      <div className="border">
        Children:
        {children}
      </div>
      {/* Render the parallel route slot */}
      Modal2:
      <div className="border">{modal2}</div>
    </div>
  )
}
