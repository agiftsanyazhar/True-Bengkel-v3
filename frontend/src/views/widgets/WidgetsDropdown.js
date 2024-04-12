import { React, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { getStyle } from '@coreui/utils'

import axios from 'axios'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  const [userCount, setUserCount] = useState(0)
  const [orderCount, setOrderCount] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    }),
      getUsers(),
      getOrder(),
      getTotalIncome()
  }, [widgetChartRef1, widgetChartRef2])

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/user')
    setUserCount(response.data.length)
  }

  const getOrder = async () => {
    const response = await axios.get('http://localhost:5000/total-order')
    setOrderCount(response.data)
  }

  const getTotalIncome = async () => {
    const response = await axios.get('http://localhost:5000/total-income')
    setTotalIncome(response.data)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)
  }

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
