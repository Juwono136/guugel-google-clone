import React, { createContext, useContext, useState } from 'react';

const stateContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const StateContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const getResults = async(url) => {
        setLoading(true)

        const res = await fetch(`${baseUrl}${url}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY
            }
        })

        const data = await res.json()
        // console.log(data)
        // console.log({url, data})
        if(url.includes('/news')) {
            setResults(data.entries)
        } else if(url.includes('/images')) {
            setResults(data.image_results)
        } else {
            setResults(data.results)
        }

        setLoading(false)
    }

    return (
        <stateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext)