import Layout from '../../components/layout';
import AdminCategories from '../../components/admin/categoriesComp';
import Crud from '../../components/admin/crudGenresComp';
import React, { useState } from 'react';

export default function Page() {
  const [showMe, setShowMe] = useState(false);
function toggle(){
  setShowMe(!showMe);
}
    return (
      <div className="admin_crud_category">

        <label for="my-modal" className="btn btn-info" onClick={toggle}>Create a new Genre</label>
        
        <div style={{
          display: showMe?"block":"none"
        }}>


          <Crud />
        </div>

            <AdminCategories />
        </div>
    )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}