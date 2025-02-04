// todo: implement authentication with GitHub or Azure

const url =
  'https://api.github.com/repos/rootdivision/front-end-accelerator-monorepo';

const Authorization = `bearer ${import.meta.env.VITE_GITHUB_PAT}`;

interface GithubContent {
  _links: {
    git: string;
    html: string;
    self: string;
  };
  download_url: string;
  git_url: string;
  html_url: string;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: string;
}

export const getFolders = async (): Promise<GithubContent[]> => {
  const res = await fetch(`${url}/contents/apps/demo`, {
    headers: { Authorization },
  });

  return res.json();
};

export const getProjects = async ({
  framework,
  type,
}: {
  framework: string;
  type: 'concepts' | 'examples';
}): Promise<GithubContent[]> => {
  const res = await fetch(`${url}/contents/apps/demo/${framework}/${type}`, {
    headers: { Authorization },
  });

  return res.json();
};
