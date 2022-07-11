import { NextPage } from 'next'
import { LogoutIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'
import { NoteForm } from '../components/NoteForm'
import { NoteItem } from '../components/NoteItem'
import { Note } from '../types/types'
import { type } from 'os'

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
      <div className="flex h-20 w-5/6 items-center justify-center bg-lime-200 text-3xl text-emerald-900">
        たびの計画
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
    </Layout>
  )
}

export default Notes
