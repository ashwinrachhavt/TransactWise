import { currentUser } from "@clerk/nextjs"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await currentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="mx-auto flex-1">{children}</div>
    </div>
  )
}
