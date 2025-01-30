import { useChat } from 'ai/react';
import clsx from 'clsx';
import {
  CircleX,
  Copy,
  LoaderCircle,
  Maximize,
  Minimize,
  Moon,
  Send,
  Sun,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

import './App.css';
import { AiAvatar, UserAvatar } from './components/Avatar';
import { Button } from './components/Button';
import { useIsMobile } from './hooks/use-mobile';

const initialMessages = import.meta.env.VITE_INITIAL_MESSAGE
  ? [
      {
        content:
          import.meta.env.VITE_INITIAL_MESSAGE || 'Hello, how can I help you?',
        id: '1',
        role: 'assistant' as const,
      },
    ]
  : [];

function App() {
  const [isOpen, setIsOpen] = useState(import.meta.env.VITE_IS_OPEN === 'true');
  const [isFullScreen, setIsFullScreen] = useState(
    import.meta.env.VITE_IS_FULLSCREEN === 'true'
  );

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const { handleInputChange, handleSubmit, input, isLoading, messages } =
    useChat({
      api: `${import.meta.env.VITE_API_URL}/chat`,
      initialMessages,
    });

  const isUser = (role: string) => role === 'user';
  const isAi = (role: string) => role !== 'user';

  useEffect(() => {
    const currentRef = messagesRef.current;
    if (!currentRef) return;

    currentRef.scrollTop = currentRef.scrollHeight;
  }, [messages]);

  return (
    <>
      {isOpen ? (
        <div
          className={clsx(
            'cw-border cw-border-border dark:cw-border-border-dark',
            'cw-bg-background dark:cw-bg-background-dark',
            'cw-text-sm cw-text-text dark:cw-text-text-dark',
            'cw-fixed cw-z-[9999999999] cw-p-4 cw-flex cw-flex-col cw-space-y-4 ',
            {
              'cw-w-full cw-h-full top-0 left-0':
                isMobile || (!isMobile && isFullScreen),
              'md:cw-w-1/2 lg:cw-w-1/3 xl:cw-w-1/4 2xl:cw-w-1/5 cw-h-2/3 cw-right-8 cw-bottom-8 cw-rounded-xl cw-shadow-xl':
                !isMobile && !isFullScreen,
            }
          )}
        >
          <div
            className="cw-overflow-y-auto cw-scrollbar-hide cw-h-full cw-flex cw-flex-col cw-space-y-4"
            ref={messagesRef}
          >
            <div className="cw-sticky cw-py-2 cw-top-0 cw-bg-background dark:cw-bg-background-dark cw-flex cw-items-center">
              <div className="cw-flex cw-items-center cw-grow cw-space-x-4">
                <AiAvatar />
                <div>
                  <p className="cw-text-xs cw-font-semibold">AI-Chatbot</p>
                  <p className="cw-text-xs">Demo AI chatbot gpt-4-mini</p>
                </div>
              </div>

              {!isMobile && (
                <Button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  variant="ghost"
                >
                  {isFullScreen ? <Minimize /> : <Maximize />}
                </Button>
              )}

              <Button
                onClick={() => {
                  document.documentElement.classList.toggle('cw-dark');
                }}
                variant="ghost"
              >
                <Moon className="dark:cw-hidden" />
                <Sun className="cw-hidden dark:cw-block" />
              </Button>
              <Button onClick={() => setIsOpen(false)} variant="ghost">
                <CircleX />
              </Button>
            </div>

            {messages.map(
              ({
                content,
                id,
                role,
                // toolInvocations
              }) => (
                <div className="cw-flex cw-flex-col cw-space-y-2" key={id}>
                  <div
                    className={clsx('cw-flex cw-items-center cw-gap-4', {
                      'cw-flex-row': isAi(role),
                      'cw-flex-row-reverse': isUser(role),
                    })}
                  >
                    {isUser(role) ? <UserAvatar /> : <AiAvatar />}

                    <div
                      className={clsx(
                        'cw-rounded-xl cw-p-3 cw-border cw-border-border dark:cw-border-border-dark',
                        {
                          'cw-bg-ai-chat-bubble dark:cw-bg-ai-chat-bubble-dark':
                            isAi(role),
                          'cw-bg-user-chat-bubble dark:cw-bg-user-chat-bubble-dark':
                            isUser(role),
                        }
                      )}
                    >
                      {/* {toolInvocations && (
                      <pre>{JSON.stringify(toolInvocations, null, 2)}</pre>
                    )} */}
                      <p>{content}</p>
                    </div>
                  </div>
                  {isAi(role) && (
                    <div className="cw-flex cw-justify-end cw-items-center">
                      <Button onClick={() => {}} variant="ghost">
                        <Copy />
                      </Button>
                      <Button onClick={() => {}} variant="ghost">
                        <ThumbsUp className="cw-text-green-500" />
                      </Button>
                      <Button onClick={() => {}} variant="ghost">
                        <ThumbsDown className="cw-text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <form
            className="cw-flex cw-space-x-4 cw-items-center"
            onSubmit={handleSubmit}
          >
            <UserAvatar />
            <input
              className="
              cw-bg-background dark:cw-bg-background-dark
              cw-text-sm cw-text-text dark:cw-text-text-dark cw-rounded-md cw-p-2 cw-grow cw-border cw-border-border dark:cw-border-border-dark cw-h-9"
              onChange={handleInputChange}
              placeholder="Say something..."
              value={input}
            />
            <Button onClick={handleSubmit} type="submit">
              {isLoading ? (
                <LoaderCircle className="cw-animate-spin" />
              ) : (
                <Send />
              )}
            </Button>
          </form>
        </div>
      ) : (
        <button
          className="cw-fixed cw-bottom-4 cw-right-4 cw-bg-transparent"
          onClick={() => setIsOpen(true)}
        >
          <AiAvatar />
        </button>
      )}
    </>
  );
}

export default App;
