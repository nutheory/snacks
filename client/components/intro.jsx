//@flow
import React from "react"
import me from '../assets/headshot.png'
import github from '../assets/github.svg'
import phoenix from '../assets/phoenix.svg'
import PDF from '../assets/resume.pdf'

const Intro = () => {
  return (
    <div className="flex flex-wrap w-4/5 mx-auto mt-12 mb-8">
      <div className="flex-1 mr-8 text-lg md:text-xl t-shadow">
        <div className="flex">
          <div className="w-20">
            <img src={`/${me}`} className=" rounded-full border-grey-darker border-4 bolder-solid mr-4 float-left w-20" />
          </div>
          <div className="flex-1 pl-4">
            <h2 className="title text-2xl lg:text-5xl">Derek Rush <span className="text-lg lg:text-2xl">Assessment</span></h2>
          </div>
        </div>
        <div className="flex-1 mt-4 md:mt-0 lg:pl-20">
          <div className="flex">
            <a className="block mr-8 pr-2 py-2" target="_blank" style={{
              paddingLeft: '2.6rem', 
              backgroundImage: `url(${github})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '28px',
              backgroundPosition: '2px 6px'}}
              href="https://github.com/nutheory">Github</a>
            <a className=" block pr-2 py-2" style={{ 
              paddingLeft: '3.4rem',
              backgroundImage: `url(${phoenix})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '42px',
              backgroundPosition: '2px 8px'}} 
              href={PDF}>Resume</a>
          </div>
          <h3 className="sub-title mt-4">Countries of the World Resource App</h3>
        </div>
      </div>
      <div className="flex-1 t-shadow mt-4 md:mt-0">
        <h2 className="title">Notes</h2>
        <ul className="p-4">
          <li className="py-2">App consists of the following components...
          <p className="py-2"><strong>Index</strong>: Entry point for the app, consists of Map, CountrySelector, and CountryCard. 
          Fires initial GET request retrieving a list of all countries with only two fields "numericCode" and "name". 
          The numeric code is used to link the map to the country name and the country names are used to populate the 
          CountrySelector component.</p>
          <p className="py-2"><strong>Map</strong>: Created with D3 to provide interactivity. Makes call to express server for 
          country coords and renders <strong>CountryElement</strong> which draws each country on the map. <i>Map is hidden on 
          smaller devices and countries that dont highlight after dropdown selection are just too small.</i></p>
          <p className="py-2"><strong>CountrySelector</strong>: Custom dropdown with filter/search feature for selecting a country.</p>
          <p className="py-2"><strong>CountryCard</strong>: Renders stateless functional component with country details.</p></li>
          <li className="py-2">Type checking using Flow.</li>
          <li className="py-2">...and its responsive (tailwindcss).</li>
        </ul>
      </div>
    </div>
  )
}

export default Intro