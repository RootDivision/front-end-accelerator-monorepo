import { urls } from '@/const';
import sdk from '@stackblitz/sdk';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export default function Detail() {
  const { framework, name, type } = useParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sdk.embedGithubProject(
        'embed',
        `${urls.STACKBLITZ}${urls.GITHUB}/${framework}/${type}/${name}`,
        { openFile: 'package.json', theme: 'light' }
      );
    }
  }, [framework, name, type]);

  return (
    <>
      <div className="grow" id="embed"></div>
      <div className="border">footer</div>
    </>
  );
}
