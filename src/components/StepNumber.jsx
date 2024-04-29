import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { fa1, faB, faBars, faClose, faList, faLongArrowAltUp, faSignOut, faU, faUser } from '@fortawesome/free-solid-svg-icons';


export default function Step({content}) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="h-[30%] flex items-center justify-center">
          <FontAwesomeIcon icon={fa1} className='text-white font-bold text-3xl'/>
        </div>
        <div className="h-[70%] text-white">
          <span className="font-bold text-primary-light">Nome do Grupo:</span> {content}.
        </div>
      </div>
      </>
  )
}