import { TodoCardProps } from "@/type"
import DeleteCard from "@/components/parts/DeleteCard"
import CardDetail from "@/components/parts/CardDetail"
import { useEffect, useState } from "react"
import Image from "next/image"
import { getImgUrl } from "@/utils/get-funcs"

export default function TodoCard(props: TodoCardProps) {
   const [imgUrl, setImgUrl] = useState<string | null>(null)

   useEffect(() => {
      if (props.todo.image) {
         const fetchImg = async () => {
            const url = await getImgUrl(props.todo.image!)
            setImgUrl(url.toString())
         }
         fetchImg()
      }
   }, [props.todo])

   return (
      <div
         ref={props.innerRef}
         {...props.draggableProps}
         {...props.dragHandleProps}
         className="border rounded-lg group  overflow-hidden shadow-sm bg-background"
      >
         <div className="flex justify-between p-2.5">
            <div className="">
               <h4>{props.todo.title}</h4>
            </div>

            <div className="flex flex-col items-center pl-2 opacity-0 group-hover:opacity-100">
               <CardDetail todo={props.todo} />

               <DeleteCard todo={props.todo} id={props.id} taskIndex={props.index} />
            </div>
            </div>

            {imgUrl && (
               <div className="relative rounded-xl overflow-hidden">
                  <Image src={imgUrl} alt="task image" width={400} height={200} className="w-full object-cover aspect-square" />
               </div>
            )}
      </div>
   )
}
