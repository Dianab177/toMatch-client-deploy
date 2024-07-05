const tabs = [
    { name: 'Escuelas', href: '/schoolstable', current: true },
    { name: 'Promoción', href: '/promotionstable', current: false },
    { name: 'Coders', href: '/codertable', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function MenuSchool() {
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
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
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
  