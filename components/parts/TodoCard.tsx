import { TodoCardProps } from "@/type"
import  DeleteCard from "@/components/parts/DeleteCard"
import CardDetail from "@/components/parts/CardDetail"


export default function TodoCard(props: TodoCardProps) {
   return (
      <div
         ref={props.innerRef}
         {...props.draggableProps}
         {...props.dragHandleProps}
         className="border rounded-lg group p-2.5 shadow-sm bg-background"
      >
         <div className="flex justify-between">
            <div className="">
               <h4>
                  {props.todo.title}
               </h4>
            </div>

            <div className="flex flex-col items-center pl-2 opacity-0 group-hover:opacity-100">
               <CardDetail todo={props.todo} />
               <DeleteCard />
            </div>
         </div>
      </div>
   )
}
