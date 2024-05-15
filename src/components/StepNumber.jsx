import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function StepNumber ({ icon, groupName, content }){  
  return (
    <div className="flex flex-col gap-5 bg-primary-light p-5 rounded-xl">
      <div className="h-[30%] flex items-center justify-center ">
        <FontAwesomeIcon icon={icon} className='font-bold bg-white text-meteorite-dark p-2 rounded-full w-6 h-6' />
      </div>
      <div className="h-[70%] text-dark text-lg flex flex-col items-center text-justify">
        <span className="font-bold text-meteorite-dark">{groupName}</span><p>{content}</p>
      </div>
    </div>
  );
};

