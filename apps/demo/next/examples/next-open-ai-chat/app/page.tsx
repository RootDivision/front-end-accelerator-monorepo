'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from 'ai/react';
import clsx from 'clsx';
import { Copy, LoaderCircle, Send, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function App() {
  const messagesRef = useRef<HTMLDivElement>(null);
  const { handleInputChange, handleSubmit, input, isLoading, messages } =
    useChat({
      initialMessages: [
        {
          content: 'Hello, how can I help you?',
          id: '1',
          role: 'assistant' as const,
        },
      ],
    });

  const isUser = (role: string) => role === 'user';
  const isAi = (role: string) => role !== 'user';

  useEffect(() => {
    const currentRef = messagesRef.current;
    if (!currentRef) return;

    currentRef.scrollTop = currentRef.scrollHeight;
  }, [messages]);

  return (
    <div className="mx-auto flex h-[calc(100vh-6rem)] max-w-2xl flex-col justify-between">
      <div
        className="scrollbar-hide flex flex-col space-y-4 overflow-auto py-4"
        ref={messagesRef}
      >
        {messages.map(({ content, id, role, toolInvocations }) => (
          <div
            className={clsx('flex items-center gap-4', {
              'flex-row': isAi(role),
              'flex-row-reverse': isUser(role),
            })}
            key={id}
          >
            <p className="text-sm font-semibold">
              {isUser(role) ? (
                <Avatar>
                  <AvatarImage
                    alt="Vuong Ha"
                    src="https://media.licdn.com/dms/image/v2/C4E03AQFVheYLEYZsrQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1644225420835?e=1741824000&v=beta&t=Xo9qxTAzNGJMyeO88W7p5tsj0QgdATDCdzCPPb7vj8c"
                  />
                  <AvatarFallback>VH</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarImage
                    alt="@shadcn"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </p>

            <div className="space-y-4">
              <Badge
                className="rounded-xl p-4"
                variant={isUser(role) ? 'outline' : 'secondary'}
              >
                {toolInvocations && (
                  <pre>{JSON.stringify(toolInvocations, null, 2)}</pre>
                )}
                <pre className="whitespace-pre-wrap">{content}</pre>
              </Badge>

              {isAi(role) && (
                <div className="flex justify-start">
                  <Button size="icon" variant="ghost">
                    <Copy />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <ThumbsUp className="text-green-500" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <ThumbsDown className="text-red-500" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <form className="flex space-x-4" onSubmit={handleSubmit}>
          <Input
            onChange={handleInputChange}
            placeholder="Say something..."
            value={input}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? <LoaderCircle className="animate-spin" /> : <Send />}
          </Button>
        </form>
      </div>
    </div>
  );
}
