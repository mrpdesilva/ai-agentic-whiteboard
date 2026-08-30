"use client"

import { Button } from '@/components/ui/button';
import { Folder } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import CreateNewBoardDialog from './CreateNewBoardDialog';

const ProjectList = () => {

  const [projectList, setProjectList] = useState([]);

  return (
    <div>
      {projectList.length === 0 ? (
        // empty state
        <div className='flex flex-col items-center p-10 border rounded-xl mt-10 gap-3'>
          <Image src="/open-folder.svg" alt="Folder" height={90} width={90} />
          <h2 className='text-2xl font-bold'>No Boards Found</h2>
          <p className='text-muted-foreground'>Create your first board to start brainstorming & planning !</p>
          <CreateNewBoardDialog/>
        </div>

      ) : <div>
        {/* project list */}

      </div>
      }
    </div >
  )
}

export default ProjectList
