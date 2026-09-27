"use client"

import SmartDoc from '@/components/custom/workspace/SmartDoc';
import dynamic from 'next/dynamic';
import WorkspaceHeader from '@/components/custom/workspace/WorkspaceHeader'
import React, { useState } from 'react'

const Whiteboard = dynamic(
  () => import('@/components/custom/workspace/Whiteboard'),
  { ssr: false }
);

function Workspace() {

  const [activeTab, setActiveTab] = useState("whiteboard");

  return (
    <div className='h-screen flex flex-col overflow-hidden'>
      <WorkspaceHeader selectedTab={(value: string) => setActiveTab(value)} />

      <div className='flex-1 w-full h-full relative overflow-hidden'>
        {activeTab == 'whiteboard' ? <Whiteboard /> : <SmartDoc />}
      </div>
    </div>
  )
}

export default Workspace
