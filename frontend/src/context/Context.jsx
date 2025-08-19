import React, { createContext } from 'react'

export const DataContext = createContext()
function Context({children}) {
     const serverUrl = "http://localhost:8000"
     const value = {
    serverUrl
  }
  return (
       <DataContext.Provider value={value} >
      {children}
    </DataContext.Provider>

  )
}

export default Context
