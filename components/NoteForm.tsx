import { FormEvent, FC } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateNote } from '../hooks/useMutateNote'
// import { useMutateDate } from '../hooks/useMutateDate'
import { Spinner } from './Spinner'

export const NoteForm: FC = () => {
  const { editedNote, editedDate } = useStore()
  const update = useStore((state) => state.updateEditedNote)
  // const updateDate = useStore((state) => state.updateEditedDate)
  const { createNoteMutation, updateNoteMutation } = useMutateNote()
  // const { createDateMutation, updateDateMutation } = useMutateDate()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedNote.id === '')
      createNoteMutation.mutate({
        title: editedNote.title,
        content: editedNote.content,
        user_id: supabase.auth.user()?.id,
      })
    else {
      updateNoteMutation.mutate({
        id: editedNote.id,
        title: editedNote.title,
        content: editedNote.content,
      })
    }
  }

  // const submitDateHandler = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (editedDate.id === '')
  //     createDateMutation.mutate({
  //       date: editedDate.date,
  //       user_id: supabase.auth.user()?.id,
  //     })
  //   else {
  //     updateDateMutation.mutate({
  //       id: editedDate.id,
  //       date: editedDate.date,
  //     })
  //   }
  // }

  if (updateNoteMutation.isLoading || createNoteMutation.isLoading) {
    return <Spinner />
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            placeholder="New plan"
            value={editedNote.title}
            onChange={(e) => update({ ...editedNote, title: e.target.value })}
          />
        </div>
        <div>
          <textarea
            cols={50}
            rows={5}
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            placeholder="content"
            value={editedNote.content}
            onChange={(e) => update({ ...editedNote, content: e.target.value })}
          />
        </div>
        <div className="my-2 flex justify-center">
          <button
            type="submit"
            className="ml-2 rounded bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {editedNote.id ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
      {/* <form onSubmit={submitDateHandler}>
        <div>
          <input
            type="date"
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            placeholder="New plan"
            value={editedDate.date}
            onChange={(e) =>
              updateDate({ ...editedDate, date: e.target.value })
            }
          />
        </div>
      </form> */}
    </>
  )
}
