import { useState, FormEvent } from 'react'
import { BadgeCheckIcon, BookOpenIcon } from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { Layout } from '../components/Layout'
import Image from 'next/image'
import { supabase } from '../utils/supabase'

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth()

  const signInWithGoogle = async () => {
    await supabase.auth.signIn({ provider: 'google' })
    // Router.push('/')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }
  return (
    <Layout title="Auth">
      <div className={'fixed top-0 left-0 z-[-1] h-screen w-full'}>
        <Image
          src="/images/top.png"
          alt={'top'}
          layout={'fill'}
          objectFit={'cover'}
        />
      </div>
      <div className="my-2 rounded-md bg-emerald-600 font-serif text-xl text-slate-50">
        <span className="text-2xl ">たびかんり。</span>
        <span className="text-xs ">あなたの旅と一緒に</span>
      </div>
      {/* <BookOpenIcon className="y-6 h-12 w-12 text-emerald-600" /> */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="my-2 rounded border border-emerald-300 px-6 py-2 text-sm placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="my-2 rounded border border-emerald-300 px-6 py-2 text-sm  placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
            placeholder="パスワード *6文字以上*"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="my-4 flex items-center justify-center text-sm">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer font-medium text-slate-50 hover:text-slate-300"
          >
            新規登録はこちらから
          </span>
        </div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <BadgeCheckIcon className="h-5 w-5" />
          </span>
          {isLogin ? 'ログイン' : '新規登録'}
        </button>
        <button
          type="submit"
          className="group relative my-4 flex w-full justify-center rounded-md bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700"
          onClick={signInWithGoogle}
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <BadgeCheckIcon className="h-5 w-5" />
          </span>
          Googleでログイン
        </button>
      </form>
    </Layout>
  )
}

export default Auth
