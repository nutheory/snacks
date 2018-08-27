//@flow
import React from "react"
import { geoMercator, geoPath } from "d3-geo"

const drawCountry = () => {
  return geoMercator()
    .scale(100)
    .translate([ 800/2, 600/2 ])
}

const Country = (props: Object) => {
  const color = 1 / props.count * props.idx + 0.2
  return (
    <path
      id={props.country.id}
      key={ `path-${ props.idx }` }
      d={ geoPath().projection(drawCountry())(props.country) }
      className="country hover:cursor-pointer"
      fill={ props.selected ? `rgba(249, 22, 177,${ color } )` : `rgba(61,72,82,${ color })` }
      stroke="#FFFFFF"
      strokeWidth={ 0.5 }
      onClick={props.selectCountry}
    />
  )
}

export default Country