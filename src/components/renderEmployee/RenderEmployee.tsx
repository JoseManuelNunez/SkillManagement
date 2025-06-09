import { useContext } from 'react'
import { Context } from '../../context/Context'

export const RenderEmployee = ({id}:{id:string}) => {
    const {employees} = useContext(Context)

    const renderSkillName = () => {
      return employees.find((s) => s.id === id)?.name
    }

  return (
    <>
     {renderSkillName()}   
    </>
  )
}
