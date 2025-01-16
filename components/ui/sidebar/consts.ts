// the pages of the application

import { UserCarsTableRow } from '@/app/dashboard/add-car/_types/types'
import { SquareTerminal, Library } from 'lucide-react'

// dashboard, login, register, my-cars, add-cars, advanced, simple, home

export const routes = (car?: UserCarsTableRow) => ({
  dashboard: {
    title: 'Dashboard',
    url: '/dashboard'
  },
  'my-cars': {
    title: 'My Cars',
    url: '/dashboard/my-cars'
  },
  'add-car': {
    title: 'Add a New Car',
    url: '/dashboard/add-car'
  },
  settings: {
    title: 'User Settings',
    url: '/dashboard/settings'
  },
  simple: {
    title: 'Simple Form',
    url: '/dashboard/add-car/simple'
  },
  advanced: {
    title: 'Advanced Form',
    url: '/dashboard/add-car/advanced'
  },
  [`${car?.id}`]: {
    title: `Car Analysis - (${car?.name})`,
    url: `/dashboard/my-cars/${car?.id}`
  }
})

export const navItems = (cars?: UserCarsTableRow[] | null) => ({
  //   dashboard: {
  //     title: 'Dashboard',
  //     url: '/dashboard',
  //     icon: ''
  //   },
  navMain: {
    title: 'Dashbaord',
    mainItems: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: 'My Cars',
            url: '/dashboard/my-cars'
          },
          {
            title: 'Add a New Car',
            url: '/dashboard/add-car'
          },
          {
            title: 'Settings',
            url: '/dashboard/settings'
          }
        ]
      },
      {
        title: 'Forms',
        url: '/dashboard/add-car',
        icon: Library,
        isActive: false,
        items: [
          {
            title: 'Simple Form',
            url: '/dashboard/add-car/simple'
          },
          {
            title: 'Advanced Form',
            url: '/dashboard/add-car/advanced'
          }
        ]
      }
    ]
  },
  cars: {
    title: 'Latest Analysis',
    mainItems: cars?.map(car => ({
      name: car.name,
      url: `/dashboard/my-cars/${car.id}`
      // icon: Library
    }))
  }
})
