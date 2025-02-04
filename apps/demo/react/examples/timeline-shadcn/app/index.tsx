import ReactDOM from 'react-dom/client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';
import { HorizontalTimeline } from './horizontal-timeline';
import './index.css';
import VerticalTimeline from './vertical-timeline';

function App() {
  return (
    <section className="p-4 flex flex-col space-y-16">
      <div className="space-y-8">
        <h1 className="text-xl font-semibold">Horizontal timeline</h1>
        <HorizontalTimeline />
      </div>

      <div className="space-y-8">
        <h1 className="text-xl font-semibold">Vertical timeline</h1>
        <VerticalTimeline />
      </div>
    </section>
  );
}

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(<App />);
