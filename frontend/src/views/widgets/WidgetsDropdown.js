import { React, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { CRow, CCol, CWidgetStatsA } from '@coreui/react'

import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const WidgetsDropdown = (props) => {
  const [userCount, setUserCount] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)

  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

  const history = useNavigate()

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token')
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setExpired(decoded.exp)
    } catch (error) {
      if (error.response) {
        history('/')
      }
    }
  }

  const axiosJwt = axios.create()

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentDate = new Date()

      if (expired * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:5000/token')
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
        setToken(response.data.accessToken)
        const decoded = jwtDecode(response.data.accessToken)
        setExpired(decoded.exp)
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/total-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUserCount(response.data)
  }

  const getOrder = async () => {
    const response = await axios.get('http://localhost:5000/total-order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setOrderCount(response.data)
  }

  const getTotalIncome = async () => {
    const response = await axios.get('http://localhost:5000/total-income', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTotalIncome(response.data)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshToken()
        await getUsers()
        await getOrder()
        await getTotalIncome()
      } catch (error) {}
    }

    fetchData()
  }, [token])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={4}>
        <CWidgetStatsA
          color="primary"
          value={formatCurrency(totalIncome)}
          className="pb-4"
          title="Total Pendapatan"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={4}>
        <CWidgetStatsA
          color="info"
          value={formatNumber(orderCount) === 0 ? '0' : formatNumber(orderCount)}
          className="pb-4"
          title="Total Pesanan"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={4}>
        <CWidgetStatsA
          color="warning"
          value={formatNumber(userCount) === 0 ? '0' : formatNumber(userCount)}
          className="pb-4"
          title="Total User"
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
