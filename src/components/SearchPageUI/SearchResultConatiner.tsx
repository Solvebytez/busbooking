'use client'
import React from 'react'
import TripFilterHeader from './TripFilterHeader'
import SearchForm from './SearchForm'
import SidebarFilter from './SidebarFilter'

const SearchResultConatiner = () => {
  return (
    <div>
        <SearchForm/>
        <TripFilterHeader/>
        <div className="px-5 m-auto flex flex-col justify-center items-center rounded-tr-lg rounded-br-lg rounded-bl-lg relative w-full">
        <div className="w-full md:px-[1rem] xl:px-[4rem]">
        <div className='flex gap-4'>
          <div className='flex flex-col w-[20%]'>
            <SidebarFilter/>
          </div>
          <div className='col-span-9  w-[80%]'>rtyrt</div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default SearchResultConatiner