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
    <div>
      <WorkspaceHeader selectedTab={(value: string) => setActiveTab(value)} />

      {activeTab == 'whiteboard' ? <Whiteboard /> : <SmartDoc />}

    </div>
  )
}

export default Workspace
