import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

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

const Kendaraan = () => {
  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

  const [kendaraans, setKendaraan] = useState([])

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

  const getKendaraans = async () => {
    const response = await axiosJwt.get('http://localhost:5000/kendaraan', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setKendaraan(response.data)
  }

  useEffect(() => {
    const message = localStorage.getItem('successMsg')

    if (message) {
      setSuccessMsg(message)
      localStorage.removeItem('successMsg')
    }

    refreshToken()
    getKendaraans()
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
          <strong>Kendaraan</strong>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">#</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">STNK</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Tipe Motor</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Nomor Mesin</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Nomor Rangka</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Tahun</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {kendaraans.map((kendaraan, index) => (
                <CTableRow v-for="item in tableItems" key={kendaraan.id}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <div>{kendaraan.stnk}</div>
                    <div className="small text-body-secondary text-nowrap">
                      <span>{kendaraan.pelanggan.name}</span>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{kendaraan.tipe_motor.name}</div>
                    <div className="small text-body-secondary text-nowrap">
                      <span>{kendaraan.warna}</span>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{kendaraan.no_mesin}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{kendaraan.no_rangka}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{kendaraan.tahun}</div>
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

export default Kendaraan
