import { Maximize2 } from 'lucide-react';
import Checked from '../assets/Checked.jsx';
import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';
import user3 from '../assets/user3.jpg';
import user4 from '../assets/user4.jpg';

const transactions = [
  {
    status: 1, 
    name: "Emmanuel Eze",
    image: user1,
    product: "PulsePod",
    date: new Date().toLocaleDateString(),
  },
  {
    status: 2, 
    name: "James",
    image: user2,
    product: "GlowLamp",
    date: new Date().toLocaleDateString(),
  },
  {
    status: 0, 
    name: "Oluouma Patience",
    image: user3,
    product: "EcoBottle",
    date: new Date().toLocaleDateString(),
  },
  {
    status: 0, 
    name: "Daniel Kasi",
    image: user4,
    product: "WaveLink",
    date: new Date().toLocaleDateString(),
  }
]

const Transactions = (props) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Transactions</h1>
        <div className="">
          Show all <Maximize2 className="size-4"/>
        </div>
      </div>
      <div className="mt-4 border border-bordercolor rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-secondary">
              <th className="p-2">
                <div className="inline-flex">
                  <label className="flex items-center justify-center 
                      cursor-pointer rleative">
                    <input type="checkbox" className="h-5 w-5 cursor-pointer 
                        transition-all appearance-none rounded shadow 
                        hover:shadow-md border border-bordercolor 
                        checked:bg-primary checked:border-primary peer" 
                        id="check1"/>
                      <span className="absolute text-white opacity-0 
                          peer-checked:opacity-100">
                        <Checked />
                      </span>
                  </label>
                </div>
              </th>
              <th className="p-2">Customer</th>
              <th className="p-2">Product</th>
              <th className="p-2 hidden md:block">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2 hidden md:block">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              const status = transaction.status === 1 
                ? "Success" : transaction.status === 0 
                ? "Failed" : "Processing";
              const statusStyle = status === "Success" 
                ? "text-green-500 bg-green-500/20" : status === "Failed"
                ? "text-red-500 bg-red-500/20" 
                  : "text-orange-500 bg-orange-300/20";

              return (
                <tr key={index}>
                  <td className="p-2">
                    <div className="inline-flex">
                      <label className="flex items-center justify-center 
                          cursor-pointer rleative">
                        <input type="checkbox" className="h-5 w-5 cursor-pointer 
                            transition-all appearance-none rounded shadow 
                            hover:shadow-md border border-bordercolor 
                            checked:bg-primary checked:border-primary peer" 
                            id="check1"/>
                          <span className="absolute text-white opacity-0 
                              peer-checked:opacity-100">
                            <Checked />
                          </span>
                      </label>
                    </div>
                  </td>
                  <td className="p-2 flex items-center gap-2">
                    <div className="size-5 overflow-hidden rounded-full">
                      <img src={transaction.image}></img>
                    </div>
                    <h3 className="font-bold text-sm hidden md:block">
                      {transaction.name}
                    </h3>
                  </td>
                  <td className="p-2">{transaction.product}</td>
                  <td className="p-2 hidden md:block">{transaction.date}</td>
                  <td className="p-2">
                    <div className={`py-1 px-2 text-xs text-center rounded-lg 
                        ${statusStyle}`}>
                      {status}
                    </div>
                  </td>
                  <td className="p-2 text-center hidden md:block">
                    <a href="#" className="font-semibold text-sm">View</a>
                  </td>
                </tr>
              )
            })} 
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transactions;