import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'

import {
  CAlert,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'

const Pesanan = () => {
  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

  const [pesanans, setPesanan] = useState([])

  const [successMsg, setSuccessMsg] = useState('')
  const [failedMsg, setFailedMsg] = useState('')
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

  const getPesanans = async () => {
    const response = await axiosJwt.get('http://localhost:5000/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setPesanan(response.data)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(value)
  }

  useEffect(() => {
    const message = localStorage.getItem('successMsg')

    if (message) {
      setSuccessMsg(message)
      localStorage.removeItem('successMsg')
    }

    refreshToken()
    getPesanans()
  }, [])

  return (
    <>
      {successMsg && (
        <CAlert color="success" variant="solid" dismissible>
          {successMsg}
        </CAlert>
      )}
      {failedMsg && (
        <CAlert color="danger" variant="solid" dismissible>
          {failedMsg}
        </CAlert>
      )}
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Pesanan</strong>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">#</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Kode Order</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Total Belanja</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {pesanans.map((pesanan, index) => (
                <CTableRow v-for="item in tableItems" key={pesanan.id}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <div>{pesanan.order_code}</div>
                    <div className="small text-body-secondary text-nowrap">
                      <span>{pesanan.pelanggan.name}</span>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{formatCurrency(pesanan.total_shopping)}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButtonGroup>
                      <Link to={`/admin/pesanan/pesanan/detil/${pesanan.id}`}>
                        <CButton color="primary" className="m-1">
                          <CIcon icon={cilInfo} />
                        </CButton>
                      </Link>
                    </CButtonGroup>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Pesanan
