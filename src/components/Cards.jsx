import React from 'react'

function Cards({event, nota, last, onClick }) {
  return (
    <>
        <article onClick={onClick} className=' bg-[#0C1826] w-full h-full rounded-lg text-center p-2 py-8'>
            <h3 className=' text-sm text-[#7D65F7] relative bottom-5 font-bold'>{event}</h3>
            <div className='flex flex-col items-center justify-center gap-2'>
                <h1 className=' text-2xl font-bold text-white'>{nota}</h1>
                <p className=' text-[11px] text-[#627f9a]'>Last updated: {last}</p>
            </div>
        </article>
    </>
  )
}

export default Cards