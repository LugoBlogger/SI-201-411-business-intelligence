import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx'
import Statistics from './components/Statistics.jsx'
import Transactions from './components/Transactions.jsx'; 
import Users from './components/Users.jsx'
import Engagement from './components/Engagement.jsx';

function App() {
  return (
    <>
      {/* <h1 className="text-red-500">Hello World</h1> */}
      <Sidebar />
      <main className="grid grid-col-1 md:grid-cols-[auto_300px] lg:pl-[300px]">
        {/** Column 1 start */}
        <section className="p-4 md:pb-16">
          <Navbar />
          <Statistics />
          <Transactions />
        </section>
        {/** Column 1 end */}

        {/** Column 2 start */}
        <section className="p-4 pb-16 border-bordercolor lg:border-l-2">
          <Users />
          <Engagement />
        </section>
        {/** Column 2 end */}
      </main>
    </>
  );
}

export default App;
