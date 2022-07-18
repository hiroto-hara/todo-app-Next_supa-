import create from 'zustand'
import { EditedDate, EditedNote, EditedComment } from './types/types'

type State = {
  editedDate: EditedDate
  editedNote: EditedNote
  editedComment: EditedComment
  updateEditedDate: (payload: EditedDate) => void
  updateEditedNote: (payload: EditedNote) => void
  updateEditedComment: (payload: EditedComment) => void
  resetEditedDate: () => void
  resetEditedNote: () => void
  resetEditedComment: () => void
}
const useStore = create<State>((set, _) => ({
  editedDate: { id: '', date: '' },
  editedNote: { id: '', title: '', content: '' },
  editedComment: { id: '', content: '' },
  updateEditedDate: (payload) =>
    set({
      editedDate: {
        id: payload.id,
        date: payload.date,
      },
    }),
  resetEditedDate: () => set({ editedDate: { id: '', date: '' } }),
  updateEditedNote: (payload) =>
    set({
      editedNote: {
        id: payload.id,
        title: payload.title,
        content: payload.content,
      },
    }),
  resetEditedNote: () =>
    set({ editedNote: { id: '', title: '', content: '' } }),
  updateEditedComment: (payload) =>
    set({
      editedComment: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedComment: () => set({ editedComment: { id: '', content: '' } }),
}))
export default useStore
