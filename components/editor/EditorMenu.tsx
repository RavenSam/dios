import { Editor } from "@tiptap/react"
import { Redo, Undo } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { menuList, textList } from "@/components/editor/menu-lists"

interface Props {
   editor: Editor | null
}

export default function EditorMenu({ editor }: Props) {
   if (!editor) return null

   return (
      <div className="flex items-center space-x-1">
         <SelectMarkText editor={editor} />

         {/* <div className="border-l h-5 !mx-2" /> */}

         {menuList(editor).map((item) => (
            <Toggle
               key={item.label}
               onClick={item.handler}
               aria-label={item.label}
               pressed={editor.isActive(item.label)}
               className="data-[state=on]:text-white data-[state=on]:bg-purple-400 transition-none"
            >
               <item.icon className="h-4 w-4" />
            </Toggle>
         ))}

         <div className="!ml-auto" />

         <Button
            aria-label="Undo"
            size={"icon"}
            variant={"ghost"}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
         >
            <Undo className="h-4 w-4" />
         </Button>

         <Button
            aria-label="Redo"
            size={"icon"}
            variant={"ghost"}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
         >
            <Redo className="h-4 w-4" />
         </Button>
      </div>
   )
}

function SelectMarkText({ editor }: { editor: Editor }) {
   const [selected, setSelected] = useState("paragraph")
   const selections = textList(editor)

   useEffect(() => {
      const { label } = selections.find((el) => (el.isActive ? el.isActive : editor?.isActive(el.label)))!

      setSelected(label)
   }, [editor, selections])

   const handleChange = (value: string) => {
      selections.find((el) => el.label === value)?.handler()
      setTimeout(() => {
         editor.commands.focus()
      }, 150)
   }

   return (
      <Select value={selected} onValueChange={handleChange}>
         <SelectTrigger className="w-[50px]">
            <SelectValue />
         </SelectTrigger>
         <SelectContent >
            {selections.map((item) => (
               <SelectItem key={item.label} value={item.label} className="data-[state=checked]:text-white data-[state=checked]:bg-purple-400 data-[state=checked]:shadow">
                  <item.icon className="h-5 w-5" />
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}
