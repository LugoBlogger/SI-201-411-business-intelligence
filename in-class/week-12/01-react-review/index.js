const app = document.getElementById("app");

function Header({ title }) {
  return (<h1>{title ? title : "Default title"}</h1>)
}

function HomePage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  const [likes, setLikes] = React.useState(0);
  // let likes = 0;

  function handleClick() {
    // console.log("increment like count")
    setLikes(likes + 1);
    // likes += 1;
  }


  return (
    <div>
      <Header title="Develop. Preview. Ship"/>
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      {/* some lines are omitted */}
      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  );
}

const root = ReactDOM.createRoot(app);
root.render(<h1>Develop. Preview. Ship.</h1>)
root.render(<HomePage />);

