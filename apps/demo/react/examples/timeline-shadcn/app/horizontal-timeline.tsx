'use client';

import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';

interface TimelineItem {
  code: string;
  content: {
    description: string;
    title: string;
  }[];
  date: string;
  id: number;
  title: string;
}

const timelineData: TimelineItem[] = [
  {
    code: 'X-60',
    content: [
      {
        description:
          'Initial planning phase for the project, including setting goals and defining scope.',
        title: 'Planning Meeting',
      },
    ],
    date: '2023-01-01',
    id: 1,
    title: 'X-60: Initial Planning',
  },
  {
    code: 'X-35',
    content: [
      {
        description:
          'Strategic meeting to outline the campaign approach and key milestones.',
        title: 'Strategy Session',
      },
      {
        description: 'Brainstorming session for creative campaign ideas.',
        title: 'Creative Brainstorm',
      },
    ],
    date: '2023-02-15',
    id: 2,
    title: 'X-35: Strategy Meeting',
  },
  {
    code: 'X-30',
    content: [
      {
        description:
          'Official launch of the campaign with a press conference and media coverage.',
        title: 'Launch Event',
      },
      {
        description: 'Social media campaign kickoff.',
        title: 'Social Media Launch',
      },
      {
        description: 'Distribution of promotional materials.',
        title: 'Promo Distribution',
      },
      {
        description:
          'Review of past campaign performances and lessons learned.',
        title: 'Performance Review',
      },
      {
        description:
          'Review of past campaign performances and lessons learned.',
        title: 'Performance Review',
      },
      {
        description:
          'Review of past campaign performances and lessons learned.',
        title: 'Performance Review',
      },
      {
        description:
          'Review of past campaign performances and lessons learned.',
        title: 'Performance Review',
      },
      {
        description:
          'Review of past campaign performances and lessons learned.',
        title: 'Performance Review',
      },
    ],
    date: '2023-03-30',
    id: 3,
    title: 'X-30: Campaign Launch',
  },
  {
    code: 'X-28',
    content: [
      {
        description: 'Recruitment drive to gather volunteers for the campaign.',
        title: 'Volunteer Drive',
      },
      {
        description: 'Training session for new volunteers.',
        title: 'Volunteer Training',
      },
      {
        description: 'Assignment of volunteer roles and responsibilities.',
        title: 'Role Assignment',
      },
    ],
    date: '2023-04-10',
    id: 4,
    title: 'X-28: Volunteer Recruitment',
  },
  {
    code: 'X-5',
    content: [
      {
        description:
          'Fundraising event to gather financial support for the campaign.',
        title: 'Fundraiser',
      },
      {
        description: 'Auction of campaign memorabilia.',
        title: 'Memorabilia Auction',
      },
      {
        description: 'Dinner with key campaign supporters.',
        title: 'Supporter Dinner',
      },
    ],
    date: '2023-05-22',
    id: 5,
    title: 'X-5: Fundraising Event',
  },
  {
    code: 'X-20',
    content: [
      {
        description:
          'Outreach to media outlets to gain coverage for the campaign.',
        title: 'Media Outreach',
      },
      {
        description: 'Press release distribution.',
        title: 'Press Release',
      },
      {
        description: 'Interviews with key campaign figures.',
        title: 'Campaign Interviews',
      },
    ],
    date: '2023-06-05',
    id: 6,
    title: 'X-20: Media Outreach',
  },
  {
    code: 'X-15',
    content: [
      {
        description:
          'Town hall meeting to engage with the community and discuss key issues.',
        title: 'Community Engagement',
      },
      {
        description: 'Q&A session with community members.',
        title: 'Community Q&A',
      },
      {
        description: 'Distribution of campaign literature.',
        title: 'Literature Distribution',
      },
    ],
    date: '2023-07-18',
    id: 7,
    title: 'X-15: Town Hall Meeting',
  },
  {
    code: 'X-10',
    content: [
      {
        description:
          'Preparation for the upcoming debate, including mock sessions and strategy planning.',
        title: 'Debate Prep',
      },
      {
        description: "Review of opponent's debate history.",
        title: 'Opponent Review',
      },
      {
        description: 'Finalization of debate talking points.',
        title: 'Talking Points',
      },
    ],
    date: '2023-08-29',
    id: 8,
    title: 'X-10: Debate Preparation',
  },
  {
    code: 'X-25',
    content: [
      {
        description:
          'Kickoff of the election campaign with rallies and public appearances.',
        title: 'Campaign Kickoff',
      },
      {
        description: 'Distribution of campaign merchandise.',
        title: 'Merchandise Distribution',
      },
      {
        description: 'Engagement with local community leaders.',
        title: 'Community Leader Engagement',
      },
    ],
    date: '2023-09-10',
    id: 9,
    title: 'X-25: Election Campaign Starts',
  },
  {
    code: 'X-20',
    content: [
      {
        description:
          'First debate between candidates, focusing on key campaign issues.',
        title: 'Debate 1',
      },
      {
        description: 'Post-debate analysis and feedback session.',
        title: 'Post-Debate Analysis',
      },
      {
        description: 'Media interviews following the debate.',
        title: 'Post-Debate Interviews',
      },
    ],
    date: '2023-10-05',
    id: 10,
    title: 'X-20: First Debate',
  },
  {
    code: 'X-10',
    content: [
      {
        description:
          'Final debate before the election, summarizing campaign promises and strategies.',
        title: 'Final Debate',
      },
      {
        description: 'Preparation of final campaign messages.',
        title: 'Final Messages',
      },
      {
        description: 'Engagement with undecided voters.',
        title: 'Undecided Voter Outreach',
      },
    ],
    date: '2023-11-01',
    id: 11,
    title: 'X-10: Final Debate',
  },
  {
    code: 'X-5',
    content: [
      {
        description:
          'Election day activities, including voter outreach and last-minute campaigning.',
        title: 'Election Day',
      },
      {
        description: 'Coordination with polling stations.',
        title: 'Polling Station Coordination',
      },
      {
        description: 'Final push for voter turnout.',
        title: 'Voter Turnout Push',
      },
    ],
    date: '2023-11-15',
    id: 12,
    title: 'X-5: Election Day',
  },
];

export function HorizontalTimeline() {
  const [activeItem, setActiveItem] = useState<TimelineItem>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineData.length > 0) {
      setActiveItem(timelineData[0]);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ behavior: 'smooth', left: -200 });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ behavior: 'smooth', left: 200 });
    }
  };

  return (
    <section className={'flex flex-col space-y-4'}>
      <div className="flex items-center space-x-4 border-b py-4">
        <Button
          className="px-2"
          onClick={scrollLeft}
          size="icon"
          variant="outline"
        >
          <ChevronLeft />
        </Button>
        <div
          className="scrollbar-hide flex space-x-4 overflow-x-auto"
          ref={scrollContainerRef}
        >
          {timelineData.map((item) => (
            <div
              className={clsx(
                'flex w-40 flex-shrink-0 cursor-pointer flex-col items-center space-y-4 rounded-lg p-4 transition-all hover:bg-accent',
                { 'bg-accent': activeItem?.id === item.id }
              )}
              key={item.id}
              onClick={() => setActiveItem(item)}
            >
              <Badge>{item.code}</Badge>

              <div className="flex h-16 w-[1px] flex-col items-center justify-end bg-slate-400">
                <div className="h-2 w-2 rounded-full bg-indigo-700"></div>
              </div>

              <Badge className="rounded-full" variant="outline">
                {item.date}
              </Badge>
            </div>
          ))}
        </div>

        <Button
          className="px-2"
          onClick={scrollRight}
          size="icon"
          variant="outline"
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="flex justify-between">
        <Badge>{timelineData[0]?.code}</Badge>
        <Badge>{timelineData[timelineData.length - 1]?.code}</Badge>
      </div>

      {activeItem && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeItem.content.map((contentItem, index) => (
            <div
              className="rounded-lg border p-4 shadow-md transition-all hover:shadow-lg"
              key={index}
            >
              <h3 className="mb-2 text-lg font-semibold">
                {contentItem.title}
              </h3>
              <p className="text-sm text-gray-600">{contentItem.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
