import { useEffect, useRef, useState } from "react";
import {
  AlignLeft,
  Bold,
  Check,
  Copy,
  Download,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  RefreshCw,
  Underline,
} from "lucide-react";
import Card from "./ui/Card.jsx";
import Button from "./ui/Button.jsx";
import { article as defaultArticle } from "../data/mock.js";

export default function ContentEditor({
  generating,
  title = "AI Generated Content",
  articleData = defaultArticle,
  autoSavedText = "Auto-saved just now",
  downloadFileName = "seo-article.txt",
}) {
  const ref = useRef(null);

  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const exec = (cmd, val) => {
    ref.current?.focus();
    document.execCommand(cmd, false, val);
  };

  const copy = async () => {
    await navigator.clipboard?.writeText(ref.current?.innerText || "");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const download = () => {
    const blob = new Blob([ref.current?.innerText || ""], {
      type: "text/plain",
    });

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = downloadFileName;

    a.click();

    URL.revokeObjectURL(a.href);
  };

  const calculateWordCount = () => {
    const text = ref.current?.innerText || "";

    const count = text.trim() ? text.trim().split(/\s+/).length : 0;

    setWordCount(count);
  };

  useEffect(() => {
    if (!ref.current) return;

    calculateWordCount();
  }, [articleData]);

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const tools = [
    [Bold, "bold"],
    [Italic, "italic"],
    [Underline, "underline"],
    [Heading2, "formatBlock", "h2"],
    [List, "insertUnorderedList"],
    [ListOrdered, "insertOrderedList"],
    [AlignLeft, "justifyLeft"],
    [Link2, "createLink", "https://example.com"],
  ];

  return (
    <Card className="flex min-w-0 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
        <h2 className="font-bold text-slate-900">{title}</h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="px-3 py-1.5 text-xs"
            onClick={copy}
          >
            {copied ? <Check /> : <Copy />}

            {copied ? "Copied" : "Copy"}
          </Button>

          <Button
            variant="outline"
            className="px-3 py-1.5 text-xs"
            onClick={download}
          >
            <Download />
            Download
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-slate-200 px-3 py-2">
        <select
          className="mr-1 h-8 rounded border border-slate-200 px-2 text-xs"
          onChange={(e) => exec("formatBlock", e.target.value)}
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        {tools.map(([Icon, cmd, val]) => (
          <button
            key={cmd + (val || "")}
            onClick={() => exec(cmd, val)}
            aria-label={cmd}
            className="grid size-8 place-items-center rounded text-slate-600 hover:bg-slate-100"
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>

      <div className="relative min-h-[420px] flex-1">
        {generating && (
          <div className="absolute inset-0 z-10 grid place-content-center gap-2 bg-white/85 text-center text-sm text-slate-600">
            <Loader2 className="mx-auto size-7 animate-spin text-green-600" />
            Generating SEO-optimized content...
          </div>
        )}

        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={calculateWordCount}
          className="max-h-[560px] overflow-y-auto p-5 text-sm leading-7 text-slate-700 outline-none [&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h2]:mb-1 [&_h2]:mt-4 [&_h2]:font-bold [&_h2]:text-slate-900 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
        >
          <h1>{articleData.title}</h1>

          <p>{articleData.intro}</p>

          {articleData.sections?.map((section, index) => (
            <div key={section.h || index}>
              <h2>{section.h}</h2>
              <p>{section.p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-4 py-2 text-[11px] text-slate-500">
        <span>
          Words: {wordCount.toLocaleString()} · Reading time: {readingTime} min
        </span>

        <span className="flex items-center gap-1">
          <RefreshCw className="size-3" />
          {autoSavedText}
        </span>
      </div>
    </Card>
  );
}
