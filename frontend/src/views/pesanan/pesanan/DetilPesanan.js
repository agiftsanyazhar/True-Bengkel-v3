import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'

import {
  CAlert,
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

const DetilPesanan = () => {
  const { id } = useParams()
  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

  const [detilPesanans, setDetilPesanan] = useState([])

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

  const getDetilPesanans = async () => {
    const response = await axiosJwt.get(`http://localhost:5000/detil-order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setDetilPesanan(response.data)
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
    getDetilPesanans()
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
          <strong>Detil Pesanan</strong>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary">Spare Part</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Qty</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Harga Satuan</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {detilPesanans.map((detilPesanan, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <div>{detilPesanan.spare_part.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{detilPesanan.qty}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{formatCurrency(detilPesanan.harga_satuan)}</div>
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

export default DetilPesanan
