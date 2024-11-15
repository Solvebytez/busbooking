
import SearchResultConatiner from '@/components/SearchPageUI/SearchResultConatiner'
import React, { Suspense } from 'react'

const Searchpage = () => {
  return (
    <div className='bg-[#f5f5f5]'>
       <Suspense fallback={"Loading..."}>
       <SearchResultConatiner/>
       </Suspense>
    </div>
  )
}

export default Searchpage