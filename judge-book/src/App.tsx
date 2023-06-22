import './App.css';
import StartPage from './components/startPage/StartPage';

function App() {
  return (
    <><div className="App">
      <div className="App-header">
        <div>Judge a book category</div>
          <div style={{display: "flex", justifyContent: 'center'}}> by its cover</div>
      </div>

    </div>
    <div>
        <StartPage />
    </div>
    </>
  );
}

export default App;
