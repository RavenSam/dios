"use client"

import EditorMenu from "@/components/editor/EditorMenu"
import { useEditor, EditorContent } from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"

export default function Editor() {
   const editor = useEditor({
      extensions: [StarterKit, Typography, Underline, Placeholder.configure({ placeholder: 'Write your card description …' })],
      content: "",
      
   })

   return (
      <div className="border rounded-lg">
        <div className="p-1">

         <EditorMenu editor={editor} />
        </div>

         <EditorContent editor={editor} className="max-h-[60vh] overflow-auto p-2"/>
      </div>
   )
}