import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    let Comp = props.Comp
    let navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/login')
        }
    })
  return (
    <div>
        <Comp/>
    </div>
  )
}

export default Protected