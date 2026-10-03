import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Download,
  FileDown,
  FileText,
  Sparkles,
} from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import ScoreRing from "../ui/ScoreRing.jsx";
import ContentEditor from "../ContentEditor.jsx";
import { Field, TagInput, inputCls } from "../ContentForm.jsx";
import GeneratorHeader from "./GeneratorHeader.jsx";

import {
  articleGeneratorSteps,
  articleGeneratorConfig,
} from "../../data/mock.js";

const {
  title,
  description,
  settingsTitle,
  fields,
  generateButton,
  generatedArticleTitle,
  seoAnalysis,
  researchData,
  export: exportConfig,
} = articleGeneratorConfig;

const iconMap = {
  word: FileText,
  pdf: FileDown,
  copy: Copy,
};

export default function ArticleGenerator() {
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [exportMessage, setExportMessage] = useState("");

  const [formData, setFormData] = useState({
    topic: fields.topic.defaultValue,
    secondaryKeywords: fields.secondaryKeywords.initial,
    targetAudience: fields.targetAudience.options[0],
    tone: fields.tone.options[0],
    contentLength: fields.contentLength.options[0],
    articleType: fields.articleType.options[0],
  });

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const generate = () => {
    setBusy(true);
    setExportMessage("");
    setStep(1);

    setTimeout(() => {
      setBusy(false);
      setStep(2);
    }, 1200);
  };

  const getArticleText = () => {
    return `${formData.topic}

Target Audience: ${formData.targetAudience}
Tone: ${formData.tone}
Content Length: ${formData.contentLength}
Article Type: ${formData.articleType}

Secondary Keywords:
${formData.secondaryKeywords.join(", ")}

SEO Score: ${seoAnalysis.score}/100
`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getArticleText());

      setStep(3);
      setExportMessage("Article content copied to clipboard.");
    } catch (error) {
      console.error("Copy failed:", error);
      setExportMessage("Unable to copy the article.");
    }
  };

  const handleWordExport = () => {
    const content = getArticleText();

    const blob = new Blob([content], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "seo-article.doc";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setStep(3);
    setExportMessage("Word document exported successfully.");
  };

  const handlePdfExport = () => {
    const content = getArticleText();

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setExportMessage("Please allow pop-ups to export the PDF.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${formData.topic}</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              line-height: 1.6;
              color: #1e293b;
            }

            h1 {
              margin-bottom: 24px;
            }

            pre {
              white-space: pre-wrap;
              font-family: Arial, sans-serif;
            }
          </style>
        </head>

        <body>
          <h1>${formData.topic}</h1>
          <pre>${content}</pre>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 250);

    setStep(3);
    setExportMessage("Print dialog opened for PDF export.");
  };

  const handleExport = (type) => {
    if (type === "copy") {
      handleCopy();
      return;
    }

    if (type === "word") {
      handleWordExport();
      return;
    }

    if (type === "pdf") {
      handlePdfExport();
    }
  };

  return (
    <div className="space-y-4">
      <GeneratorHeader title={title} description={description}>
        <ol className="hidden gap-4 md:flex">
          {articleGeneratorSteps.map((s, i) => (
            <li
              key={s}
              className={`flex items-center gap-1.5 text-xs font-semibold ${
                i <= step ? "text-green-700" : "text-slate-400"
              }`}
            >
              <span
                className={`grid size-5 place-items-center rounded-full text-[10px] ${
                  i <= step ? "bg-green-600 text-white" : "bg-slate-200"
                }`}
              >
                {i + 1}
              </span>

              {s}
            </li>
          ))}
        </ol>
      </GeneratorHeader>

      <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)_300px]">
        <Card className="p-4">
          <h2 className="mb-4 font-bold">{settingsTitle}</h2>

          <div className="space-y-4">
            <Field label={fields.topic.label}>
              <input
                className={inputCls}
                value={formData.topic}
                onChange={(e) => updateField("topic", e.target.value)}
              />
            </Field>

            <Field label={fields.secondaryKeywords.label}>
              <TagInput
                initial={formData.secondaryKeywords}
                value={formData.secondaryKeywords}
                onChange={(value) => updateField("secondaryKeywords", value)}
              />
            </Field>

            <Field label={fields.targetAudience.label}>
              <select
                className={inputCls}
                value={formData.targetAudience}
                onChange={(e) => updateField("targetAudience", e.target.value)}
              >
                {fields.targetAudience.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>

            <Field label={fields.tone.label}>
              <select
                className={inputCls}
                value={formData.tone}
                onChange={(e) => updateField("tone", e.target.value)}
              >
                {fields.tone.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>

            <Field label={fields.contentLength.label}>
              <select
                className={inputCls}
                value={formData.contentLength}
                onChange={(e) => updateField("contentLength", e.target.value)}
              >
                {fields.contentLength.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>

            <Field label={fields.articleType.label}>
              <select
                className={inputCls}
                value={formData.articleType}
                onChange={(e) => updateField("articleType", e.target.value)}
              >
                {fields.articleType.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>

            <Button className="h-11 w-full" onClick={generate} disabled={busy}>
              <Sparkles />

              {busy ? generateButton.busy : generateButton.idle}

              <ArrowRight />
            </Button>
          </div>
        </Card>

        <ContentEditor generating={busy} title={generatedArticleTitle} />

        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="mb-3 font-bold">{seoAnalysis.title}</h2>

            <div className="flex flex-col items-center gap-4 sm:flex-row xl:flex-col">
              <ScoreRing
                value={seoAnalysis.score}
                label={seoAnalysis.scoreLabel}
              />

              <ul className="space-y-2 text-xs text-slate-600">
                {seoAnalysis.checks.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="mb-2 font-bold">{researchData.title}</h3>

            {researchData.rows.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[100px_1fr] border-b border-slate-100 py-2 text-[11px] last:border-0"
              >
                <span className="text-slate-500">{label}</span>

                <span className="font-medium">{value}</span>
              </div>
            ))}
          </Card>

          <Card className="p-4">
            <h3 className="mb-3 font-bold">{exportConfig.title}</h3>

            <div className="grid grid-cols-3 gap-2">
              {exportConfig.options.map((option) => {
                const Icon = iconMap[option.type];

                return (
                  <Button
                    key={option.type}
                    variant="outline"
                    className="group h-16 flex-col gap-1.5 text-[11px]"
                    onClick={() => handleExport(option.type)}
                  >
                    <span className="grid size-7 place-items-center rounded-md bg-slate-100 transition-colors group-hover:bg-green-50">
                      <Icon className="size-4 text-slate-600 transition-colors group-hover:text-green-600" />
                    </span>

                    <span>{option.label}</span>
                  </Button>
                );
              })}
            </div>

            {exportMessage && (
              <p className="mt-3 text-center text-xs font-medium text-green-600">
                {exportMessage}
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
