import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Departments',
    path: '/reports',
    icon: <FaIcons.FaHospital />,
    cName: 'nav-text'
  },
  {
    title: 'Services',
    path: '/products',
    icon: <MdIcons.MdMedicalServices />,
    cName: 'nav-text'
  },
  {
    title: 'Appointments',
    path: '/team',
    icon: <AiIcons.AiFillClockCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Bills',
    path: '/support',
    icon: <RiIcons.RiBillFill />,
    cName: 'nav-text'
  },
  {
    title: 'Devices',
    path: '/support',
    icon: <RiIcons.RiDeviceFill />,
    cName: 'nav-text'
  }

];