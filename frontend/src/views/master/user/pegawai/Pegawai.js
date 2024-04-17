import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'

import {
  CAlert,
  CButton,
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
import { cilPlus } from '@coreui/icons'

const Pegawai = () => {
  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

  const [pegawais, setPegawai] = useState([])

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

  const getPegawais = async () => {
    const response = await axiosJwt.get('http://localhost:5000/pegawai', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setPegawai(response.data)
  }

  useEffect(() => {
    const message = localStorage.getItem('successMsg')

    if (message) {
      setSuccessMsg(message)
      localStorage.removeItem('successMsg')
    }

    refreshToken()
    getPegawais()
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
          <strong>Pegawai</strong>
          <Link to="/master/user/pegawai/tambah">
            <CButton color="primary" className="ms-3">
              <CIcon icon={cilPlus} />
            </CButton>
          </Link>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">#</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Nama</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Telepon</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Alamat</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Jabatan</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {pegawais.map((pegawai, index) => (
                <CTableRow v-for="item in tableItems" key={pegawai.id}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <div>{pegawai.name}</div>
                    <div className="small text-body-secondary text-nowrap">
                      <span>{pegawai.email}</span>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{pegawai.phone}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{pegawai.address}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{pegawai.jabatan.name}</div>
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

export default Pegawai
