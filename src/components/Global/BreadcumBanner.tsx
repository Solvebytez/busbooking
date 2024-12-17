import React from 'react'

const BreadcumBanner = ({bgImage,pageText}:{bgImage:string;pageText:string}) => {
  return (
<div
  className="relative text-white h-[calc(50vh)] bg-cover"
  style={{
    background: `url(${bgImage}) 100% 60% / cover no-repeat rgb(0, 0, 0)`,
    color: "rgb(255, 255, 255)",
  }}
>
  <div className="flex items-center justify-center h-full bg-black bg-opacity-40 w-full px-0 md:px-6 pt-16 pb-16">
    <div className="flex flex-col items-center space-y-6 flex-wrap">
      <h1 className="text-3xl md:text-6xl font-tenor_Sans tracking-[6px] uppercase text-center">
        {pageText}
      </h1>
    </div>
  </div>
</div>
  )
}

export default BreadcumBanner