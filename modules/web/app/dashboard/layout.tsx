import React from 'react'
import { Routes } from '@/app/Routes'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const user = cookieStore.get('user')?.value

  if (!user) {
    redirect(Routes.login)
  }

  return <>{children}</>
}
