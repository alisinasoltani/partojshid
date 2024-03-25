import '@/app/lodge/styles.css';
import Image from 'next/image';
import buildDefinition from '@/public/logos/build-definition.svg';
import building from '@/public/logos/building.svg';

const LodgeProjects = () => {
  return (
    <div className='flex flex-col justify-start items-center my-[3rem]'>
        <div className="flex flex-row py-3 px-8">
            <div className='flex flex-col'><Image src={buildDefinition} alt='seal check logo' width={40} /></div>
            <h2 className="lodge-title yekanb">پروژه ها</h2>
            <div className='flex flex-col'><Image src={building} alt='license logo' width={40} /></div>
        </div>
        
    </div>
  )
}

export default LodgeProjects