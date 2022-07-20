import { NextPage } from 'next'
import { LogoutIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'
import { NoteForm } from '../components/NoteForm'
import { NoteItem } from '../components/NoteItem'
import { Note } from '../types/types'
import Image from 'next/image'

export const getStaticProps: GetStaticProps = async () => {
  console.log('ISR invoked - notes page')
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) {
    throw new Error(`${error.message}:${error.details}`)
  }
  return {
    props: { notes },
    revalidate: false,
  }
}

type StaticProps = {
  notes: Note[]
}

const Notes: NextPage<StaticProps> = ({ notes }) => {
  const signOut = () => {
    supabase.auth.signOut()
  }
  return (
    <Layout title="Notes">
      <div className={'fixed top-0 left-0 z-[-1] h-screen w-full'}>
        <Image
          src="/images/top.png"
          alt={'top'}
          layout={'fill'}
          objectFit={'cover'}
        />
      </div>
      <div className="flex flex-col items-center ">
        <div className="mt-4 flex h-[7vh] w-[80vw] items-center justify-center rounded-md bg-slate-50 font-serif text-3xl text-emerald-900 shadow-xl">
          〜〜* たびの計画 *〜〜
        </div>
        <ul className="my-2 w-4/5">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              user_id={note.user_id}
            />
          ))}
        </ul>
        <NoteForm />
        <LogoutIcon
          className="mb-6 h-6 w-6 cursor-pointer text-emerald-600"
          onClick={signOut}
        />
      </div>
    </Layout>
  )
}

export default Notes
