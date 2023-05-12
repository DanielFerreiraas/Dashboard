import React from "react";

export interface IconsProps{
    icon:React.ReactNode;
}

const Icons:React.FC<IconsProps> = ({icon}) => {
    return(
        <div>
            {icon}
        </div>
    )
}

export default Icons;