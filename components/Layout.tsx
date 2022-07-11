import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { BadgeCheckIcon } from '@heroicons/react/solid'

type Title = {
  title: string
  children: ReactNode
}

export const Layout: FC<Title> = ({ children, title = 'Note app' }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex h-12 w-screen border-t bg-lime-500 ">
        <div className="flex h-full w-screen items-center justify-center text-xl text-lime-50">
          たびかんり。
        </div>
      </header>
      <main className="flex w-screen flex-1 flex-col items-center justify-center bg-lime-50">
        {children}
      </main>
      <footer className="flex h-12 w-screen items-center justify-center border-t bg-lime-200">
        <BadgeCheckIcon className="h-6 w-6 text-lime-500" />
      </footer>
    </div>
  )
}
