import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { createCategory, getCategories, removeCategory } from '../../../functions/category'

const CategoryCreate = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        getCategories().then((catg) => setCategories(catg.data))
    }

    const { user } = useSelector(state => ({ ...state }))

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCategory({ name }, user.token)
            .then(res => {
                // console.log(res)
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is created`)
                loadCategories()
            })
            .catch(err => {
                // console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleRemove = async (slug) => {
        // let answer = window.confirm('Are you Sure to Delete ?')
        // console.log(answer)
        if (window.confirm('Are you Sure to Delete ?')) {
            setLoading(true)
            removeCategory(slug, user.token)
                .then(res => {
                    setLoading(false)
                    toast.error(`${res.data.name} is deleted`)
                    loadCategories()
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setLoading(false)
                        toast.error(err.response.data)
                    }
                })
        }
    }

    const categoryForm = () => <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" onChange={e => setName(e.target.value)} required autoFocus value={name} />
            <br />
            <button className='btn button-outline-primary'>Save</button>
        </div>
    </form>

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Create category</h4>}
                    {categoryForm()}
                    <hr />
                    {categories.map((catg) => (
                        <div className='alert alert-secondary' key={catg._id}>
                            {catg.name}
                            <span onClick={() => handleRemove(catg.slug)} className='btn btn-sm float-right'><DeleteOutlined className='text-danger' /></span>
                            <Link to={`/admin/category/${catg.slug}`}><span className='btn btn-sm float-right'><EditOutlined className='text-warning' /></span></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate