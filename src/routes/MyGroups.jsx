import Header from "@/components/Header"
import { useParams } from "react-router-dom"

export default function MyGroups(){
  const { id } = useParams()

  return(
    <div className="h-screen flex flex-col">
      <Header/>
      <div className="bg-white flex-grow overflow-y-auto flex flex-col items-center justify-center">
        
      </div>
    </div>
  )

}