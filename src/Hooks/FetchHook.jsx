import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    const getData = async () => {
        try {
            const { data } = await axios.get(url)
            setData(data)
            setError(false)
        } catch (e) {
            setError(true)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return [data, error]
}

export default useFetch
