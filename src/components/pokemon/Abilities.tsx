import React from 'react';

type AbilitiesProps = {
  abilities: {
    ability: {
      name: string;
    };
  }[];
};

function Abilities({ abilities }: AbilitiesProps) {
  return (
    <ul className="list-disc list-inside">
      {abilities.map(({ ability }) => (
        <li key={ability.name} className="capitalize">
          {ability.name.replace('-', ' ')}
        </li>
      ))}
    </ul>
  );
}

export default Abilities; 
