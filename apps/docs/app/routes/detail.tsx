import { urls } from '@/const';
import { useAppStore } from '@/store';
import sdk from '@stackblitz/sdk';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export default function Detail() {
  const theme = useAppStore((state) => state.theme);

  const { framework, name, type } = useParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sdk.embedGithubProject(
        'stackBlitzContainer',
        `${urls.STACKBLITZ}${urls.GITHUB}/${framework}/${type}/${name}`,
        { openFile: 'package.json', theme }
      );
    }

    return () => {};
  }, [framework, name, type, theme]);

  return (
    <div className="h-full border bg-gray-50  dark:bg-zinc-800 rounded-xl overflow-hidden">
      <div className="h-full" id="stackBlitzContainer"></div>
    </div>
  );
}
