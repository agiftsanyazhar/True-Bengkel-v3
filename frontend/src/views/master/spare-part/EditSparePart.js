import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CForm, CFormInput } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'

const EditJabatan = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [allowance, setAllowance] = useState('')

  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

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

  const updateJabatan = async (e) => {
    e.preventDefault()

    try {
      await axios.patch(
        `http://localhost:5000/jabatan/${id}`,
        {
          name,
          salary,
          allowance,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      localStorage.setItem('successMsg', 'Data berhasil disimpan!')
      history(-1)
    } catch (error) {
      setFailedMsg(error.response.data.msg)
    }
  }

  const getJabatanById = async () => {
    const response = await axios.get(`http://localhost:5000/jabatan/${id}`)
    setName(response.data.name)
    setSalary(response.data.salary)
    setAllowance(response.data.allowance)
  }

  useEffect(() => {
    const message = localStorage.getItem('successMsg')

    if (message) {
      setSuccessMsg(message)
      localStorage.removeItem('successMsg')
    }

    refreshToken()
    getJabatanById()
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
          <strong>Edit Jabatan</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={updateJabatan}>
            <div className="mb-3">
              <CFormInput
                type="text"
                placeholder="Nama Jabatan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="number"
                placeholder="Gaji"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="number"
                placeholder="Tunjangan (ketik 0 jika tidak ada)"
                value={allowance}
                onChange={(e) => setAllowance(e.target.value)}
                required
              />
            </div>
            <CButton type="submit" color="primary">
              <CIcon icon={cilSave} />
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default EditJabatan
