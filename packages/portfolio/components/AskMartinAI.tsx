'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import {
  Box,
  Fab,
  Drawer,
  IconButton,
  Typography,
  TextField,
  Stack,
  CircularProgress,
  Tooltip,
} from '@mui/material';

type Role = 'user' | 'assistant';
type ChatMessage = { role: Role; content: string };

const STARTER_PROMPTS = [
  'What does Martin do?',
  'Tell me about PS Rewards',
  'How does he use AI in his work?',
  'What tech does he specialize in?',
];

export default function AskMartinAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
      setMessages(next);
      setInput('');
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      let assistantText = '';
      setMessages([...next, { role: 'assistant', content: '' }]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: next }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          assistantText += decoder.decode(value, { stream: true });
          setMessages([...next, { role: 'assistant', content: assistantText }]);
        }
      } catch (err) {
        const msg =
          err instanceof DOMException && err.name === 'AbortError'
            ? '[Stopped]'
            : `[Error: ${err instanceof Error ? err.message : 'Unknown'}]`;
        setMessages([
          ...next,
          { role: 'assistant', content: assistantText ? `${assistantText}\n\n${msg}` : msg },
        ]);
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      <Tooltip title="Ask Martin's AI" placement="left">
        <Fab
          color="primary"
          aria-label="Open AI chat"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            zIndex: 1200,
            boxShadow: (theme) =>
              `0 4px 14px 0 ${theme.palette.primary.main}55, 0 0 0 4px ${theme.palette.primary.main}1A`,
          }}
        >
          <ChatBubbleIcon />
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 420 },
            maxWidth: '100vw',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              Ask Martin&apos;s AI
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Grounded on Martin&apos;s portfolio · powered by Claude
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)} size="small" aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          ref={scrollRef}
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 2,
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {messages.length === 0 ? (
            <Stack spacing={2}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Hi! Ask me anything about Martin&apos;s work, projects, or experience. I&apos;m
                grounded on the content of this site.
              </Typography>
              <Stack spacing={1}>
                {STARTER_PROMPTS.map((p) => (
                  <Box
                    key={p}
                    component="button"
                    onClick={() => send(p)}
                    sx={{
                      textAlign: 'left',
                      px: 1.5,
                      py: 1,
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: 'background.paper',
                      color: 'text.primary',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'accent.light',
                      },
                    }}
                  >
                    {p}
                  </Box>
                ))}
              </Stack>
            </Stack>
          ) : (
            messages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor:
                    m.role === 'user' ? 'primary.main' : 'background.paper',
                  color: m.role === 'user' ? 'primary.contrastText' : 'text.primary',
                  border: m.role === 'assistant' ? '1px solid' : 'none',
                  borderColor: 'divider',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                }}
              >
                {m.content || (streaming && i === messages.length - 1 ? <CircularProgress size={14} /> : '')}
              </Box>
            ))
          )}
        </Box>

        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            p: 1.5,
            flexShrink: 0,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Ask about Martin's work..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={streaming}
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton
                    onClick={() => send(input)}
                    disabled={streaming || !input.trim()}
                    size="small"
                    color="primary"
                    aria-label="Send"
                  >
                    {streaming ? <CircularProgress size={18} /> : <SendIcon />}
                  </IconButton>
                ),
              },
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            AI responses can be wrong — for anything important, email{' '}
            <Box
              component="a"
              href="mailto:martin.sagat@outlook.com.au"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              martin.sagat@outlook.com.au
            </Box>
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}

function ChatBubbleIcon() {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </Box>
  );
}

function CloseIcon() {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Box>
  );
}

function SendIcon() {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </Box>
  );
}
