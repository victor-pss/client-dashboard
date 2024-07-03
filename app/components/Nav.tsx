import React from 'react';
import Logo from '../../public/pss-logo.png';
import Image from 'next/image';
import Header from './Head/Head';

export default function Nav({ children, clientId, projectManager, title }: { children: React.ReactNode, clientId: string, projectManager: string, title: string }) {
  return (
    <>
      <Header title={title} />
      <nav className="flex justify-between items-center w-full shadow-lg shadow-gray-500 h-20 bg-gradient-to-br from-[#802BB1] to-[#0024C0] rounded-b-sm">
        <div className="p-3">
          <Image className="invert brightness-0" src={Logo} alt="Plastic Surgery Studios Logo" height={100} width={100} />
        </div>
        <div className="p-3 flex items-center space-x-4">
          {clientId !== '' ? (
            <span className="align-middle text-gray-400 font-normal">Client: <span className="text-white font-bold">{clientId}</span></span>
          ) : null}
          {projectManager !== '' ? (
            <span className="align-middle text-gray-400 font-normal">Your Project Manager: <span className="text-white font-bold">{projectManager}</span></span>
          ) : null}
        </div>
      </nav >
      <div>
        {children}
      </div>
    </>
  )
}
