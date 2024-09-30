import React from "react";
import TypeBadge from "../common/TypeBadge";

type WeaknessesProps = {
  weaknesses: string[];
};

 function Weaknesses({ weaknesses }: WeaknessesProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold">Weaknesses</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {weaknesses.map((weakness) => (
          <TypeBadge key={weakness} type={weakness} />
        ))}
      </div>
    </div>
  );
}

export default Weaknesses; 
