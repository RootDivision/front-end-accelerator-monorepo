import { useEffect } from 'react';
import { useParams } from 'react-router';
import sdk from '@stackblitz/sdk';

export default function Detail() {
  const { id } = useParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sdk.embedGithubProject(
        'embed',
        'RootDivision/front-end-accelerator/tree/main/examples/react/basic',
        {
          openFile: 'package.json',
          theme: 'light',
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-red-400 p-12">
      <div id="embed" className="grow"></div>
    </div>
  );
}
