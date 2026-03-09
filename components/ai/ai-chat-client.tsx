"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { isTextUIPart, type UIMessage } from "ai"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message"
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  IconAdjustmentsHorizontal,
  IconBolt,
  IconMessageCircle,
  IconPaperclip,
  IconRefresh,
} from "@tabler/icons-react"

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter(isTextUIPart)
    .map((p) => p.text)
    .join("")
}

const SUGGESTED_QUESTIONS = [
  "Describe your business and get tailored suggestions",
  "How can the map help my business?",
  "What 360Data features fit my goals?",
]

export function AiChatClient() {
  const [inputValue, setInputValue] = useState("")
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const handleSend = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || status !== "ready") return
    sendMessage({ text: trimmed })
    setInputValue("")
  }

  const handleRefresh = () => {
    setMessages([])
  }

  const chatStatus: "ready" | "streaming" | "submitted" =
    status === "error" ? "ready" : status

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col overflow-hidden p-4">
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg sm:w-3/5">
        <header className="flex items-center justify-between gap-4 border-b border-border/80 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-balance text-2xl font-black">
                Botcell
              </div>
              <div className="flex flex-col gap-0.5 text-pretty text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="hidden sm:inline">
                    Tell me about your business — I&apos;ll suggest how 360Data can help
                  </span>
                </span>
                <span className="text-[10px] italic opacity-80">
                  This is not trained AI. It is for test and prototype basic purposes only.
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="size-8"
              aria-label="New chat"
              title="New chat"
              onClick={handleRefresh}
            >
              <IconRefresh className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-8"
              aria-label="Settings"
              title="Settings"
            >
              <IconAdjustmentsHorizontal className="size-4" />
            </Button>
          </div>
        </header>

        <Conversation className="flex-1 bg-muted/30">
          <ConversationContent className="gap-6 pl-1">
            {messages.length === 0 && (
              <Message from="assistant">
                <MessageContent className="leading-relaxed max-w-prose">
                  <MessageResponse>
                    **Welcome to Botcell.** Tell me about your business—your industry, goals, or challenges—and I&apos;ll suggest how 360Data can help with:
                    - Location insights and targeting
                    - Campaigns and audience building
                    - Reports and analytics
                    Start by describing your business or asking for suggestions.
                  </MessageResponse>
                </MessageContent>
              </Message>
            )}
            {messages.map((message) => {
              const text = getMessageText(message)
              if (!text) return null
              const role = message.role as "user" | "assistant"
              return (
                <Message key={message.id} from={role}>
                  <MessageContent
                    className={cn(
                      "leading-relaxed",
                      role === "assistant" && "max-w-prose"
                    )}
                  >
                    {role === "assistant" ? (
                      <MessageResponse>{text}</MessageResponse>
                    ) : (
                      <p className="whitespace-pre-wrap text-pretty">{text}</p>
                    )}
                  </MessageContent>
                </Message>
              )
            })}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="bg-background">
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 border-b border-border/80 px-4 py-3">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setInputValue(question)}
                  className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          <PromptInput
            onSubmit={(message) => handleSend(message.text)}
            className="w-full [&>[data-slot=input-group]]:rounded-none [&>[data-slot=input-group]]:shadow-none [&>[data-slot=input-group]]:border-t [&>[data-slot=input-group]]:border-x-0 [&>[data-slot=input-group]]:border-b-0 [&>[data-slot=input-group]]:border-border/80 [&>[data-slot=input-group]]:focus-within:ring-0 [&>[data-slot=input-group]]:focus-within:ring-transparent [&>[data-slot=input-group]]:focus-within:ring-offset-0 [&>[data-slot=input-group]]:focus-within:border-border/80 [&>[data-slot=input-group]]:focus-within:outline-none"
          >
            <PromptInputTextarea
              placeholder="Describe your business, goals, or ask for suggestions..."
              value={inputValue}
              onChange={(event) => setInputValue(event.currentTarget.value)}
            />
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton aria-label="Attach">
                  <IconPaperclip className="size-4" />
                </PromptInputButton>
                <PromptInputButton aria-label="Quick prompt">
                  <IconBolt className="size-4" />
                </PromptInputButton>
                <PromptInputButton aria-label="New chat">
                  <IconMessageCircle className="size-4" />
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit
                status={chatStatus}
                disabled={chatStatus === "ready" && !inputValue.trim()}
                onStop={chatStatus === "streaming" ? stop : undefined}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  )
}
