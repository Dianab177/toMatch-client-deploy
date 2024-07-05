import React from 'react';
import "../css/styles.css";
import SomosF5LogoOrange from '../../../assets/img/SomosF5LogoOrange.png';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  DocumentIcon,
  IdentificationIcon,
  FolderIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'


const Drawer = () => {
  const navigation = [
    { name: 'Evento', href: '/', icon: CalendarIcon, current: false },
    { name: 'Match', href: 'match', icon: DocumentIcon, current: false },
    { name: 'Agenda', href: 'datematches', icon: CalendarDaysIcon, current: false },
    { name: 'Admin', href: 'admin', icon: FolderIcon, current: false },
    { name: 'Empresas', href: 'companies', icon: IdentificationIcon, current: false },
    { name: 'Escuelas', href: 'schools', icon: HomeIcon, current: false },
    { name: 'Estadísticas', href: 'statistics', icon: ChartBarIcon, current: false },
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className="h-screen sticky top-0 drawer-component flex grow flex-col gap-y-5 overflow-y-auto border-r border-orange bg-stone6 px-6">
      <div className="flex h-16 shrink-0 items-center my-8">
        <Link to="/">
        <img
          className="h-14 w-auto"
          src={SomosF5LogoOrange}
          alt="Logo de SomosF5"
        />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="names mx-2 space-y-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-stone3 text-white'
                        : 'text-white hover:text-orangel hover:bg-white',
                      'group flex gap-x-3 rounded-md p-2 text-lg leading-6 font-semibold text-white'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-white' : 'text-white group-hover:text-stone7',
                        'h-8 w-8 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Drawer;