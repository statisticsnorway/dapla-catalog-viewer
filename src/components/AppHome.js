import React, { useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Divider, Loader } from 'semantic-ui-react'
import { ErrorMessage } from '@statisticsnorway/dapla-js-utilities'

import CatalogFilter from './CatalogFilter'
import CatalogLabels from './CatalogLabels'
import CatalogTable from './CatalogTable'
import { convertDateToView, findCommonPrefixes, sortArrayBy } from '../utilities'
import { API } from '../configurations'

function AppHome ({ restApi, language }) {
  const [filterBy, setFilterBy] = useState('')
  const [catalogs, setCatalogs] = useState([])
  const [fetchTime, setFetchTime] = useState('')
  const [commonPrefixes, setCommonPrefixes] = useState([])
  const [sortDirection, setSortDirection] = useState('ascending')
  const [sortedBy, setSortedBy] = useState(API.CATALOG_OBJECT.OBJECT.STRING[0])

  const [{ data, loading, error }, refetch] = useAxios(`${restApi}${API.GET_CATALOGS}`)

  const handleSort = (sortBy, type) => {
    const newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending'

    if (sortBy === sortedBy) {
      setSortDirection(newSortDirection)
      setCatalogs(catalogs.reverse())
    } else {
      setSortedBy(sortBy)
      setCatalogs(sortArrayBy(catalogs, sortBy, type))
    }
  }

  useEffect(() => {
    if (!loading && !error && data !== undefined) {
      if (Array.isArray(data[API.CATALOGS])) {
        try {
          setFetchTime(convertDateToView(Date.now(), true))
          setCommonPrefixes(findCommonPrefixes(data[API.CATALOGS]))
          setCatalogs(sortArrayBy(data[API.CATALOGS], API.CATALOG_OBJECT.OBJECT.STRING[0], 'nestedString'))
        } catch (e) {
          console.log(e)
        }
      } else {
        console.log('Received catalogs is not of Array format, received was:')
        console.log(data)
      }
    }
  }, [data, error, loading])

  useEffect(() => {
    const handleFilter = string => {
      try {
        setSortedBy('')
        setSortDirection('ascending')
        setCatalogs(data[API.CATALOGS].filter(({ id }) => id[API.CATALOG_OBJECT.OBJECT.STRING[0]].includes(string)))
      } catch (e) {
        console.log(e)
      }
    }

    if (data !== undefined && Array.isArray(data[API.CATALOGS])) {
      handleFilter(filterBy)
    }
  }, [data, filterBy])

  return (
    <>
      <CatalogFilter
        error={error}
        loading={loading}
        refetch={refetch}
        filterBy={filterBy}
        language={language}
        fetchTime={fetchTime}
        setFilterBy={setFilterBy}
      />
      <Divider hidden />
      {loading ? <Loader active inline='centered' /> : error ? <ErrorMessage error={error} language={language} /> :
        <>
          <CatalogLabels commonPrefixes={commonPrefixes} length={data[API.CATALOGS].length} setFilterBy={setFilterBy} />
          <Divider hidden />
          <CatalogTable
            language={language}
            sortedBy={sortedBy}
            catalogs={catalogs}
            handleSort={handleSort}
            sortDirection={sortDirection}
          />
        </>
      }
    </>
  )
}

export default AppHome
