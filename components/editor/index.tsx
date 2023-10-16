"use client"

import EditorMenu from "@/components/editor/EditorMenu"
import { useEditor, EditorContent } from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"

export default function Editor({ content }: { content: string | undefined }) {
   const editor = useEditor({
      extensions: [
         StarterKit,
         Typography,
         Underline,
         Placeholder.configure({ placeholder: "Write your card description …" }),
      ],
      content,
   })

   return (
      <div className="border rounded-lg">
         <div className="p-1">
            <EditorMenu editor={editor} />
         </div>

         <EditorContent editor={editor} className="prose max-h-[30vh] overflow-auto px-2 py-6" />
      </div>
   )
}
