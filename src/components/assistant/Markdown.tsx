import { memo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/utils';

const CodeBlock: React.FC<{ code: string; dark: boolean }> = ({ code, dark }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative group/code my-1">
      <button
        type="button"
        onClick={copy}
        aria-label="Kodni nusxalash"
        className={cn(
          'absolute right-2 top-2 z-10 rounded-md p-1.5 opacity-0 transition group-hover/code:opacity-100',
          dark ? 'bg-white/10 text-slate-200 hover:bg-white/20' : 'bg-slate-800/10 text-slate-700 hover:bg-slate-800/20'
        )}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>
      <pre className="hljs"><code>{code}</code></pre>
    </div>
  );
};

interface MarkdownProps {
  content: string;
  dark?: boolean;
}

export const Markdown: React.FC<MarkdownProps> = memo(({ content, dark = false }) => {
  return (
    <div className={cn('assistant-md', dark && 'assistant-md-dark')}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code(props) {
            const { className, children, ...rest } = props as { className?: string; children?: React.ReactNode };
            const text = String(children ?? '').replace(/\n$/, '');
            const isBlock = /language-/.test(className ?? '') || text.includes('\n');
            if (!isBlock) {
              return (
                <code className={className} {...rest}>
                  {children}
                </code>
              );
            }
            return <CodeBlock code={text} dark={dark} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

Markdown.displayName = 'Markdown';

