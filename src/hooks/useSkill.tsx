import { useContext } from "react";
import { Context } from "../context/Context";

export function useSkill(id:number) {

    const {skills} = useContext(Context)

    const name = skills.find((s) => s.id === id.toString())?.name
    const description = skills.find((s) => s.id === id.toString())?.description


    return {
        name,
        description
    }

}