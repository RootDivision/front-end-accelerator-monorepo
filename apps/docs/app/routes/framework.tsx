import { useParams } from 'react-router';

export default function Framework() {
  const { framework } = useParams();

  return <h1>{framework} overview page</h1>;
}
