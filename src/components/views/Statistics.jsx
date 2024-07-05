import React from 'react';
import MolStatisticsStackedAreaCharts from '../molecule/Mol-statistics/MolStatisticsStackedAreaCharts';
import MolStatisticsSimpleBarCharts from '../molecule/Mol-statistics/MolStatisticsSimpleBarCharts';



const Statistics = () => {
  return (
    <div className="bg-stone6 w-screen max-w-screen-xl rounded-xl p-20 m-20 text-white">
       <h2 className="text-2xl font-semibold leading-7 text-orange">Estadística eventos </h2>
      <div className="mt-10 space-y-8 border-b border-orange pb-12 sm:space-y-0 sm:divide-y sm:divide-orange sm:border-t sm:pb-0">
        <div>
        <h3 className="text-xl my-5 font-medium leading-6 text-white sm:pt-4">Número máximo de entrevistas recruiter</h3>
        <MolStatisticsSimpleBarCharts/>
        </div>
        <div>
        <h3 className="text-xl my-5 font-medium leading-6 text-white sm:pt-4">Número máximo de entrevistas por coder</h3>
        <MolStatisticsStackedAreaCharts/>
        </div>
      </div>
    </div>
  )
}

export default Statistics