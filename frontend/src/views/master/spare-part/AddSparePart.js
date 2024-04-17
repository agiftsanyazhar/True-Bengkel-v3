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
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'

const AddSparePart = () => {
  const [sparePartCode, setSparePartCode] = useState('')
  const [selectedTipeMotor, setSelectedTipeMotor] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')

  const [token, setToken] = useState('')
  const [expired, setExpired] = useState('')

  const [tipeMotors, setTipeMotor] = useState([])

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

  const saveSparePart = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        'http://localhost:5000/spare-part',
        {
          spare_part_code: sparePartCode,
          tipe_motor_id: selectedTipeMotor,
          name,
          description,
          stock,
          price,
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

  const getTipeMotors = async () => {
    const response = await axiosJwt.get('http://localhost:5000/tipe-motor', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTipeMotor(response.data)
  }

  useEffect(() => {
    const message = localStorage.getItem('successMsg')

    if (message) {
      setSuccessMsg(message)
      localStorage.removeItem('successMsg')
    }

    refreshToken()
    getTipeMotors()
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
          <strong>Tambah Spare Part</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={saveSparePart}>
            <div className="mb-3">
              <CFormInput
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="text"
                placeholder="Kode Spare Part"
                value={sparePartCode}
                onChange={(e) => setSparePartCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormSelect
                value={selectedTipeMotor}
                onChange={(e) => setSelectedTipeMotor(e.target.value)}
              >
                <option>Pilih Tipe Motor</option>
                {tipeMotors.map((tipeMotor, index) => (
                  <option key={index} value={tipeMotor.id}>
                    {tipeMotor.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormTextarea
                rows={5}
                placeholder="Deskripsi"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></CFormTextarea>
            </div>
            <div className="mb-3">
              <CFormInput
                type="number"
                placeholder="Stok"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="number"
                placeholder="Harga"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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

export default AddSparePart
