import React from 'react'

type InfoCardProps = {
  title: string
  number: number
  unit: string
}


const InfoCard = ({title, number, unit}: InfoCardProps) => {
  return (
    <div className="w-full bg-neutral-800 rounded-xl p-3">
      <p className="mb-5 font-light">{title}</p>
      <p className="text-2xl font-light">{number}{unit}</p>
    </div>
  )
}

export default InfoCard

