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

const SparePart = () => {
  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

  const [spareParts, setSparePart] = useState([])

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

  const getSpareParts = async () => {
    const response = await axiosJwt.get('http://localhost:5000/spare-part', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setSparePart(response.data)
  }

  const deleteSparePart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/spare-part/${id}`)
      getSpareParts()
      setSuccessMsg('Data berhasil dihapus!')
    } catch (error) {
      console.log(error)
      setFailedMsg('Data gagal dihapus!')
    }
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
    const message = localStorage.getItem('successMsg')

    if (message) {
      setSuccessMsg(message)
      localStorage.removeItem('successMsg')
    }

    refreshToken()
    getSpareParts()
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
          <strong>Spare Part</strong>
          <Link to="/master/spare-part/tambah">
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
                <CTableHeaderCell className="bg-body-tertiary">Tipe Motor</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Deskripsi</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Stok</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Harga</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {spareParts.map((sparePart, index) => (
                <CTableRow v-for="item in tableItems" key={sparePart.id}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell>
                    <div>{sparePart.name}</div>
                    <div className="small text-body-secondary text-nowrap">
                      <span>{sparePart.spare_part_code}</span>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{sparePart.tipe_motor.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      {sparePart.description.length > 100
                        ? sparePart.description.substring(0, 100) + '...'
                        : sparePart.description}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{formatNumber(sparePart.stock)}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{formatCurrency(sparePart.price)}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/master/data-master/spare-part/edit/${sparePart.id}`}>
                      <CButton color="warning" className="m-1">
                        <CIcon icon={cilPencil} />
                      </CButton>
                    </Link>
                    <CButton
                      color="danger"
                      className="m-1"
                      onClick={() => {
                        if (window.confirm('Apakah Anda yakin ingin menhapus ini?')) {
                          deleteSparePart(sparePart.id)
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

export default SparePart
