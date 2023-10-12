import { Models } from "appwrite"
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd"

export interface Board {
   columns: Map<TypedColumn, Column>
}

export type TypedColumn = "todo" | "inprogress" | "done"

export interface Column {
   id: TypedColumn
   todos: Todo[]
}

export interface Todo extends Models.Document {
   $id: string
   $createdAt: string
   title: string
   description: string
   status: TypedColumn
   image?: Image
}

export interface Image {
   bucketId: string
   fileId: string
}

export interface ColumnProps {
   id: TypedColumn
   todos: Todo[]
   index: number
}

export interface TodoCardProps {
   id: TypedColumn
   index: number
   todo: Todo
   draggableProps: DraggableProvidedDraggableProps
   dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
   innerRef: (element: HTMLElement | null) => void
}
