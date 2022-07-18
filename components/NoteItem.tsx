import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  PencilAltIcon,
  TrashIcon,
  CheckCircleIcon,
  HeartIcon,
} from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateNote } from '../hooks/useMutateNote'
import { Spinner } from './Spinner'
import { Note } from '../types/types'
import { DateForm } from './DateForm'

export const NoteItem: FC<
  Omit<Note, 'created_at' | 'note_id' | 'comments'>
> = ({ id, title, content, user_id }) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedNote)
  const { deleteNoteMutation } = useMutateNote()

  const [likes, setLikes] = useState<boolean>(false)

  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])

  if (deleteNoteMutation.isLoading) {
    return <Spinner />
  }

  return (
    <li className="my-3 flex h-14 justify-between rounded-md bg-slate-50 font-serif shadow-xl">
      <div className="ml-2 flex items-center  text-emerald-700">
        <CheckCircleIcon className=" mr-2 h-6 w-6" />
        <DateForm />
        <Link href={`/note/${id}`} prefetch={false}>
          <a className="cursor-pointer hover:text-emerald-500">
            {title} <span className="text-gray-400">←click</span>
          </a>
        </Link>
      </div>
      <div className="mr-2 flex items-center">
        {userId === user_id && (
          <>
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
              className="mx-5 h-5 w-5 cursor-pointer text-emerald-700"
              onClick={() => {
                deleteNoteMutation.mutate(id)
              }}
            />

            <span className="ml-1 text-xs"></span>
          </>
        )}
        <span>
          {likes ? (
            <HeartIcon
              onClick={() => setLikes(!likes)}
              className=" h-5 w-5 cursor-pointer text-red-500"
            />
          ) : (
            <HeartIcon
              onClick={() => setLikes(!likes)}
              className=" h-5 w-5 cursor-pointer text-emerald-700"
            />
          )}
        </span>
      </div>
    </li>
  )
}
