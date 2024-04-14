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
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'

const Jabatan = () => {
  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

  const [jabatans, setJabatan] = useState([])

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

  const getJabatans = async () => {
    const response = await axiosJwt.get('http://localhost:5000/jabatan', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setJabatan(response.data)
  }

  const deletejabatan = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jabatan/${id}`)
      getJabatans()
      setSuccessMsg('Data berhasil dihapus!')
    } catch (error) {
      console.log(error)
      setFailedMsg('Data gagal dihapus!')
    }
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
    getJabatans()
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
          <strong>Jabatan</strong>
          <Link to="/master/data-master/jabatan/tambah">
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
                <CTableHeaderCell className="bg-body-tertiary">Gaji</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Tunjangan</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {jabatans.map((jabatan, index) => (
                <CTableRow v-for="item in tableItems" key={jabatan.id}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <div>{jabatan.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{formatCurrency(jabatan.salary)}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{formatCurrency(jabatan.allowance)}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/master/data-master/jabatan/edit/${jabatan.id}`}>
                      <CButton color="warning" className="m-1">
                        <CIcon icon={cilPencil} />
                      </CButton>
                    </Link>
                    <CButton
                      color="danger"
                      className="m-1"
                      onClick={() => {
                        if (window.confirm('Apakah Anda yakin ingin menhapus ini?')) {
                          deletejabatan(jabatan.id)
                        }
                      }}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
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

export default Jabatan
