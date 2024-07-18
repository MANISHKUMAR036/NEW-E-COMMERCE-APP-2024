import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu.js'
import Layout from '../../components/Layout/Layout.js'

const Products = () => {
  return (
    <Layout>
        <div>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>ALL Products List</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products