import ReactDOM from 'react-dom/client';

function App() {
  return <h1>State management</h1>;
}

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
