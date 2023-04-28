import Layout from '../../components/layout';
import React, { useState } from 'react';
import Concert from '../../components/admin/unitConcertComp';
import TicketsList from '../../components/admin/ticketsListComp';

export default function Page() {
  return (
    <div className="admin_concertUnit">
        <Concert />
        
        <TicketsList />
    </div>
  )
}

Page.getLayout = function getLayout() {
  return (
    <Layout />
  )
}