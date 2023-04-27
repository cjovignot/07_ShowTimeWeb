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
        <div>
          <div class="toggle">Create New Concert
            <label class="switch">
              <input type="checkbox"  onClick={toggle}></input>
              <span class="slider round"></span>
            </label>
          </div>
          
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