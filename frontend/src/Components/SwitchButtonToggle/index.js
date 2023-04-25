import React from 'react'
import * as C from "./styles"

const SwitchButtonToggle = ({checked, onChange}) => {
  return (
    <C.Container>

    <div className="container">
    <input onChange={onChange} checked={checked} type="checkbox" className="checkbox" id="checkbox"/>
    <label className="switch" htmlFor="checkbox">
        <span className="slider"></span>
    </label>
    </div>
  </C.Container>
  )
}

export default SwitchButtonToggle