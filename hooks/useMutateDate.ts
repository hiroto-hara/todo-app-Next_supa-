import { useMutation } from 'react-query'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { revalidateSingle } from '../utils/revalidation'
import { Date, EditedDate } from '../types/types'

export const useMutateDate = () => {
  const reset = useStore((state) => state.resetEditedDate)
  const createDateMutation = useMutation(
    async (inputDate: Omit<Date, 'created_at' | 'id'>) => {
      const { data, error } = await supabase.from('dates').insert(inputDate)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id)
        reset()
        alert('Successfully completed !!')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateDateMutation = useMutation(
    async (inputDate: EditedDate) => {
      const { data, error } = await supabase
        .from('dates')
        .update({ date: inputDate.date })
        .eq('id', inputDate.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id)
        reset()
        alert('Successfully completed !!')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteDateMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('dates').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].note_id)
        reset()
        alert('Successfully completed !!')
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return {
    deleteDateMutation,
    createDateMutation,
    updateDateMutation,
  }
}
