import React, { useState, createContext, useContext } from "react";

const SelectedFilterModeContext = createContext()

export const SelectedFilterModeProvider = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filterData, setFilterData] = useState([]);

  return (
    <SelectedFilterModeContext.Provider value={{ selectedFilter, handleSelectedFilter: setSelectedFilter,filterData, setFilterData }}>
      {children}
    </SelectedFilterModeContext.Provider>
  )
}

export const useSessionRecordingCustomHooks = () => {
  const { selectedFilter, handleSelectedFilter, filterData, setFilterData } = useContext(SelectedFilterModeContext)
  return { selectedFilter, handleSelectedFilter, filterData, setFilterData }
}

// export const useSessionRecordingCustomHooks = ()=> {
//   const [selectedFilter, setSelectedFilter] = useState([]);

//   const handleSelectedFilter = (item) => {
//     setSelectedFilter(selectedFilter?.includes(item) ? selectedFilter.filter(key => key !== item)   : [...selectedFilter, item])
//   };

//   return [selectedFilter, handleSelectedFilter];
// }
