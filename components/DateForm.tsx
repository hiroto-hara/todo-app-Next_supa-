import { FormEvent, FC } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateDate } from '../hooks/useMutateDate'
import { Spinner } from './Spinner'

export const DateForm: FC = () => {
  const { editedDate } = useStore()
  const update = useStore((state) => state.updateEditedDate)
  const { createDateMutation, updateDateMutation } = useMutateDate()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedDate.id === '') {
      createDateMutation.mutate({
        date: editedDate.date,
        user_id: supabase.auth.user()?.id,
      })
    } else {
      updateDateMutation.mutate({
        id: editedDate.id,
        date: editedDate.date,
      })
    }
  }
  if (updateDateMutation.isLoading || createDateMutation.isLoading) {
    return <Spinner />
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="date"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        value={editedDate.date}
        onChange={(e) => update({ ...editedDate, date: e.target.value })}
      />
    </form>
  )
}
