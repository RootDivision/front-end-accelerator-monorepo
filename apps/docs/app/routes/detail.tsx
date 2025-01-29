import { urls } from '@/const';
import sdk from '@stackblitz/sdk';
import { useLayoutEffect } from 'react';
import { useParams } from 'react-router';

export default function Detail() {
  const { framework, name } = useParams();

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      sdk.embedGithubProject(
        'embed',
        `${urls.STACKBLITZ}${urls.GITHUB}/${framework}/${name}`,
        { openFile: 'package.json', theme: 'light' }
      );
    }
  }, [framework, name]);

  return (
    <>
      <div className="grow" id="embed"></div>
      <div className="border">footer</div>
    </>
  );
}
