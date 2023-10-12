import { BubbleMenu, Editor } from "@tiptap/react"
import { Italic, Bold, Strikethrough, Underline, Code } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

interface EditorMenuProps {
   editor: Editor | null
}

export default function EditorMenu({ editor }: EditorMenuProps) {
   if (!editor) return null

   const menuList = [
      {
         label: "Toggle bold",
         icon: Bold,
         handler: () => editor.chain().focus().toggleBold().run(),
      },
      {
         label: "Toggle italic",
         icon: Italic,
         handler: () => editor.chain().focus().toggleItalic().run(),
      },
      {
         label: "Toggle underline",
         icon: Underline,
         handler: () => editor.chain().focus().toggleUnderline().run(),
      },
      {
         label: "Toggle strikethrough",
         icon: Strikethrough,
         handler: () => editor.chain().focus().toggleStrike().run(),
      },
      {
         label: "Toggle code",
         icon: Code,
         handler: () => editor.chain().focus().toggleCode().run(),
      },
   ]

   return (
      <div className="flex items-center space-x-1">
         {menuList.map((item) => (
            <Toggle
               key={item.label}
               onClick={item.handler}
               aria-label={item.label}
               className="data-[state=on]:text-white data-[state=on]:bg-purple-400"
            >
               <item.icon className="h-4 w-4" />
            </Toggle>
         ))}
      </div>
   )
}
