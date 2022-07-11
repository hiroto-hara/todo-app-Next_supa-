import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  PencilAltIcon,
  TrashIcon,
  CheckCircleIcon,
} from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateNote } from '../hooks/useMutateNote'
import { Spinner } from './Spinner'
import { Note } from '../types/types'

export const NoteItem: FC<
  Omit<Note, 'created_at' | 'note_id' | 'comments'>
> = ({ id, title, content, user_id }) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedNote)
  const { deleteNoteMutation } = useMutateNote()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  if (deleteNoteMutation.isLoading) {
    return <Spinner />
  }
  return (
    <li className="my-3 flex h-14 justify-between bg-lime-100">
      <div className="ml-2 flex items-center text-emerald-700">
        <CheckCircleIcon className="h-6 w-6" />
        <Link href={`/note/${id}`} prefetch={false}>
          <a className="cursor-pointer hover:text-emerald-600">{title}</a>
        </Link>
      </div>
      {userId === user_id && (
        <div className="mr-2 flex items-center">
          <PencilAltIcon
            className="mx-2 h-5 w-5 cursor-pointer text-emerald-700"
            onClick={() => {
              update({
                id: id,
                title: title,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-emerald-700"
            onClick={() => {
              deleteNoteMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}
