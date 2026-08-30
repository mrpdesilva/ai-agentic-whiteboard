"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react';
import React from 'react'
import CreateNewBoardDialog from './CreateNewBoardDialog';

const WelcomeBanner = () => {

  const {user} = useUser();

  return (
    <div>
      <div className='p-10 border rounded-xl bg-gradient-to-r from-blue-200 to to-purple-200'>
        <h2 className='text-2xl font-bold'>Welcome Back, {user?.fullName} 👋</h2>
        <p className='mt-2'>Bring Your ideas to infinite canvas</p>

        <div className='flex items-center gap-2 mt-5'>
          <CreateNewBoardDialog/>
          <Button variant='outline' size="lg"><Sparkles/> AI Helper</Button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner
