import { useContext } from "react";
import { Context } from "../../context/Context";

export const RenderSkill = ({ id, Description }: { id: string, Description: boolean}) => {
  const {skills} = useContext(Context)

  const renderSkillName = () => {
    return skills.find((s) => s.id === id)?.name
  }

  const renderSkillDescription = () => {
    return skills.find((s) => s.id === id)?.description
  }


  return (
    <>
      {Description ? renderSkillDescription() : renderSkillName()}
    </>
  );
};
