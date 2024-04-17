import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'

const RegisterPegawai = () => {
  const [role_id, setRoleId] = useState(2)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [selectedJabatan, setSelectedJabatan] = useState('')

  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

  const [jabatans, setJabatan] = useState([])

  const [successMsg, setSuccessMsg] = useState('')
  const [failedMsg, setFailedMsg] = useState('')
  const history = useNavigate()

  const saveRegister = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/register', {
        role_id,
        name,
        email,
        password,
        rePassword,
        phone,
        address,
        jabatan_id: selectedJabatan,
      })
      localStorage.setItem('successMsg', 'Pegawai berhasil ditambahkan! Silakan login!')
      history(-1)
    } catch (error) {
      if (error.response) {
        setFailedMsg(error.response.data.msg)
      }
    }
  }

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
          <strong>Tambah Pegawai</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={saveRegister}>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="hidden"
                placeholder="Role"
                value={role_id}
                onChange={(e) => setRoleId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="number"
                placeholder="Telepon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="text"
                placeholder="Alamat"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormSelect
                value={selectedJabatan}
                onChange={(e) => setSelectedJabatan(e.target.value)}
              >
                <option>Pilih Jabatan</option>
                {jabatans.map((jabatan, index) => (
                  <option key={index} value={jabatan.id}>
                    {jabatan.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                className="mb-3"
                type="password"
                placeholder="Ulangi Password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
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

export default RegisterPegawai
