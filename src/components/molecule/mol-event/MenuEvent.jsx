const tabs = [
    { name: 'Eventos', href: '/eventtable', current: true },
    { name: 'Crear evento', href: '/eventcreate', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function MenuEvent() {
    return (
      <div className="border-b border-orange mt-10">
        <div className="sm:flex sm:items-baseline">
          <div className="mt-4 sm:ml-10 sm:mt-0">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'border-orangel text-orange'
                      : 'border-transparent text-stone5 hover:border-stone3 hover:text-stone7',
                    'whitespace-nowrap border-b-2 px-1 pb-4 text-lg font-medium'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    )
  }
  