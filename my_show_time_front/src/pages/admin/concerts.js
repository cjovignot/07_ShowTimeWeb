import Layout from '../../components/layout';
import AdminConcerts from '../../components/admin/concertsComp';
import Crud from '../../components/admin/crudConcertComp';
import React, { useState } from 'react';

export default function Page() {
  const [showMe, setShowMe] = useState(false);
function toggle(){
  setShowMe(!showMe);
}
    return (
        <div className="admin_crud_concert">        
          <label for="my-modal" className="btn btn-info" onClick={toggle}>Create a new Concert</label>
          
          <div style={{
            display: showMe?"block":"none"
            }}>
          <Crud />
          </div>

          <AdminConcerts />
        </div>
    )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}