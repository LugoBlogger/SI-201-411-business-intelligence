import { Chart } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const Statistics = (props) => {
  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [6, 16, 12, 16, 11, 20, 19],
        backgroundColor: "rgba(141, 110, 234, 0.8)",
      },
      {
        label: "Profit",
        data: [4, 14, 10, 15, 10, 18, 17],
        backgroundColor: "rgba(34, 197, 94, 0.4)",
      },
    ]
  };
  const revenueChartOptions = {
    scales: {
      x: {
        grid: {
          color: "rgba(229, 231, 234, 0.4)"
        },
        ticks: {
          font: {
            size: 18 
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          stepSize: 4,
          autoSkip: false,
          font: {
            size: 18
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false
      }
    },
    barThickness: 20,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10
  };


  return (
    <div className="md:border border-bordercolor md:p-4 rounded-lg mt-20 
        sm:mt-6">
      <div className="grid sm:grid-rows-3 gap-2">
        {/** box start */}
        <div className="p-4 rounded-l transition-all bg-accent/10 
            hover:bg-accent/50 shadow-lg">
            <h4 className="text-tmuted text-left">Total Customers</h4>
            <div className="mt-2 lg:flex items-center justify-between gap-4">
              <h1 className="font-bold text-lg">67,904</h1>
              <p className="text-red-500 text-sm">+4.50%</p>
            </div>
        </div>
        {/** box end */}

        {/** box start */}
        <div className="p-4 rounded-l transition-all bg-primary/10 
            hover:bg-primary/5 shadow-lg">
            <h4 className="text-tmuted text-left">Total Revenue</h4>
            <div className="mt-2 lg:flex items-center justify-between gap-4">
              <h1 className="font-bold text-lg">$309,939</h1>
              <p className="text-green-500 text-sm">+9.150%</p>
            </div>
        </div>
        {/** box end */}

        {/** box start */}
        <div className="p-4 rounded-l transition-all bg-green-300/10 
            hover:bg-green-300/5 shadow-lg">
            <h4 className="text-tmuted text-left">Total Income</h4>
            <div className="mt-2 lg:flex items-center justify-between gap-4">
              <h1 className="font-bold text-lg">$1.500m</h1>
              <p className="text-green-500 text-sm">+12.0%</p>
            </div>
        </div>
        {/** box end */}
      </div>
    
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Revenue Analytics</h3>
          <div className="flex items-center gap-4">
            <button className="bg-transparent border border-bordercolor px-2 
                rounded-full text-xs text-tmuted hover:text-tcolor 
                transition">
              Week
            </button>
            <button className="bg-transparent border border-bordercolor px-2 
                rounded-full text-xs text-tmuted hover:text-tcolor 
                transition">
                Month
            </button>
            <button className="bg-transparent border border-bordercolor px-2 
                rounded-full text-xs text-tmuted hover:text-tcolor 
                transition">
                Year
            </button>
          </div>
        </div>
      </div>
    
      <div className="my-4">
        <p className="text-lg text-tmuted">Income</p>
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg">$6,023</h1>
          <p className="text-green-500 text-sm">+3.0%</p>
        </div>
        <p className="text-xs text-tmuted">Total income this week</p>
      </div>

      <div className="mt-8">
        <Bar data={revenueData} options={revenueChartOptions}/>
      </div>
    </div>
  )
}

export default Statistics;