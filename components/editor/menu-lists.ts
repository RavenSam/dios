import { Editor } from "@tiptap/react"
import {
   Italic,
   Bold,
   Strikethrough,
   Underline,
   Code,
   ListOrdered,
   List,
   Text,
   Heading1,
   Heading2,
   Heading4,
   Heading3,
} from "lucide-react"

export const menuList = (editor: Editor) => [
   {
      label: "bold",
      icon: Bold,
      handler: () => editor.chain().focus().toggleBold().run(),
   },
   {
      label: "italic",
      icon: Italic,
      handler: () => editor.chain().focus().toggleItalic().run(),
   },
   {
      label: "underline",
      icon: Underline,
      handler: () => editor.chain().focus().toggleUnderline().run(),
   },
   {
      label: "strike",
      icon: Strikethrough,
      handler: () => editor.chain().focus().toggleStrike().run(),
   },
   {
      label: "code",
      icon: Code,
      handler: () => editor.chain().focus().toggleCode().run(),
   },
]

export const textList = (editor: Editor) => [
   {
      label: "paragraph",
      icon: Text,
      handler: () => editor.chain().focus().setParagraph().run(),
   },
   {
      label: "h1",
      icon: Heading1,
      handler: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
   },
   {
      label: "h2",
      icon: Heading2,
      handler: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
   },
   {
      label: "h3",
      icon: Heading3,
      handler: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
   },
   {
      label: "h4",
      icon: Heading4,
      handler: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor.isActive("heading", { level: 4 }),
   },
   {
      label: "bulletList",
      icon: List,
      handler: () => editor.chain().focus().toggleBulletList().run(),
   },
   {
      label: "orderedList",
      icon: ListOrdered,
      handler: () => editor.chain().focus().toggleOrderedList().run(),
   },
]
