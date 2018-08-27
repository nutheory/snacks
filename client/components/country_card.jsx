//@flow
import React from "react"
import { head } from 'ramda'

const CountryCard = (props: Object) => {
  const details = props.country
  return (
    <div className="mx-6 md:mx-12">
      <div className="flex flex-wrap mb-6">
        <div className="flex-1 mx-2">
          <h4>Region</h4>
          <p className="country-data">{ details.region }</p>
        </div>
        <div className="flex-1 mx-2">
          <h4>Capital city</h4>
          <p className="country-data">{ details.capital }</p>
        </div>
      </div>
      <div className="flex flex-wrap mb-6">
        <div className="flex-1 mx-2">
          <h4>Population</h4>
          <p className="country-data">{ details.population.toLocaleString() }</p>
        </div>
        <div className="flex-1 mx-2">
          <h4>Demonym</h4>
          <p className="country-data">{ details.demonym }</p>
        </div>
      </div>
      <div className="flex flex-wrap mb-6">
        <div className="flex-1 mx-2">
          <h4>Currency</h4>
          <p className="country-data">{ head(details.currencies).name }</p>
        </div>
      </div>
    </div>
  )
}

export default CountryCard