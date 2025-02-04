import { getFolders } from '@/api';
import { queryIds } from '@/const';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';

import { FrameworkLogo } from './app-sidebar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function FoldersSelect() {
  const { framework } = useParams();
  const navigate = useNavigate();

  const foldersQuery = useQuery({
    queryFn: () => getFolders(),
    queryKey: [queryIds.GET_FOLDERS],
  });

  return (
    <Select onValueChange={(value) => navigate(`/${value}`)} value={framework}>
      <SelectTrigger>
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {foldersQuery.data?.map((folder) => (
            <SelectItem key={folder.name} value={folder.name}>
              <div className="flex items-center gap-3">
                <FrameworkLogo framework={folder.name} />
                {folder.name}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
