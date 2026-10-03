import { useState } from "react";
import {
  ArrowRight,
  Check,
  Clipboard,
  Download,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import { Field, TagInput, inputCls } from "../ContentForm.jsx";
import GeneratorHeader from "./GeneratorHeader.jsx";
import { metaTitles, metaTitleGeneratorConfig } from "../../data/mock.js";

const {
  title,
  description,
  form,
  generateButton,
  generatedSection,
  tableHeaders,
  seoScore,
  export: exportConfig,
  selectedLabel,
} = metaTitleGeneratorConfig;

export default function MetaTitleGenerator() {
  const [selected, setSelected] = useState(0);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(-1);

  /*
   * This is the ACTUAL generated result.
   *
   * It changes ONLY after clicking Generate.
   */
  const [generatedTitles, setGeneratedTitles] = useState([]);

  /*
   * This stores the form values.
   *
   * Changing these values does NOT change generatedTitles.
   */
  const [formData, setFormData] = useState({
    topic: form.topic.defaultValue,
    secondaryKeywords: form.secondaryKeywords.initial,
    targetAudience: form.targetAudience.options[0],
    platformLocation: form.platformLocation.options[0],
    numberOfSuggestions: form.numberOfSuggestions.options[0],
  });

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    /*
     * Do NOT modify generatedTitles here.
     *
     * The generated results must change only
     * after the Generate button is clicked.
     */
  };

  /*
   * Convert the selected dropdown value into a number.
   *
   * Examples:
   *
   * "5"               -> 5
   * "10"              -> 10
   * "5 Suggestions"   -> 5
   * "10 Suggestions"  -> 10
   */
  const getSuggestionCount = () => {
    const value = String(formData.numberOfSuggestions);

    const match = value.match(/\d+/);

    return match ? Number(match[0]) : 0;
  };

  /*
   * Generate titles.
   *
   * IMPORTANT:
   * This is the ONLY place where generatedTitles changes.
   */
  const generate = () => {
    setBusy(true);
    setCopied(-1);

    const numberOfSuggestions = getSuggestionCount();

    setTimeout(() => {
      /*
       * Take the requested number of titles
       * ONLY after Generate is clicked.
       */
      const generated = metaTitles.slice(0, numberOfSuggestions);

      setGeneratedTitles(generated);

      setSelected(0);
      setBusy(false);
    }, 800);
  };

  /*
   * Regenerate button uses the same Generate logic.
   */
  const regenerate = () => {
    generate();
  };

  const copy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(index);

      setTimeout(() => {
        setCopied(-1);
      }, 1200);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const exportCsv = () => {
    /*
     * Export only what has actually been generated.
     */
    if (generatedTitles.length === 0) {
      return;
    }

    const csv =
      "Title,Characters\n" +
      generatedTitles
        .map((text) => `"${text.replace(/"/g, '""')}",${text.length}`)
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = exportConfig.fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const selectedTitle = generatedTitles[selected] || "";

  return (
    <div className="space-y-4">
      <GeneratorHeader title={title} description={description}>
        <Button onClick={exportCsv} disabled={generatedTitles.length === 0}>
          <Download />
          {exportConfig.label}
        </Button>
      </GeneratorHeader>

      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* =================================================
            FORM
        ================================================= */}

        <Card className="p-4">
          <h2 className="mb-4 font-bold">{form.title}</h2>

          <div className="space-y-4">
            {/* Topic */}

            <Field label={form.topic.label}>
              <input
                className={inputCls}
                value={formData.topic}
                onChange={(event) => updateField("topic", event.target.value)}
              />
            </Field>

            {/* Secondary Keywords */}

            <Field label={form.secondaryKeywords.label}>
              <TagInput
                initial={formData.secondaryKeywords}
                value={formData.secondaryKeywords}
                onChange={(value) => updateField("secondaryKeywords", value)}
              />
            </Field>

            {/* Target Audience */}

            <Field label={form.targetAudience.label}>
              <select
                className={inputCls}
                value={formData.targetAudience}
                onChange={(event) =>
                  updateField("targetAudience", event.target.value)
                }
              >
                {form.targetAudience.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            {/* Platform / Location */}

            <Field label={form.platformLocation.label}>
              <select
                className={inputCls}
                value={formData.platformLocation}
                onChange={(event) =>
                  updateField("platformLocation", event.target.value)
                }
              >
                {form.platformLocation.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            {/* Number of Suggestions */}

            <Field label={form.numberOfSuggestions.label}>
              <select
                className={inputCls}
                value={formData.numberOfSuggestions}
                onChange={(event) =>
                  updateField("numberOfSuggestions", event.target.value)
                }
              >
                {form.numberOfSuggestions.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            {/* Generate */}

            <Button className="h-11 w-full" onClick={generate} disabled={busy}>
              <Sparkles />

              {busy ? generateButton.busy : generateButton.idle}

              <ArrowRight />
            </Button>
          </div>
        </Card>

        {/* =================================================
            GENERATED TITLES
        ================================================= */}

        <Card
          className={`min-w-0 overflow-hidden transition ${
            busy ? "opacity-50" : ""
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <h2 className="font-bold">{generatedSection.title}</h2>

              {generatedTitles.length > 0 && (
                <p className="mt-1 text-xs text-slate-500">
                  {generatedTitles.length} suggestions generated
                </p>
              )}
            </div>

            <Button
              variant="ghost"
              className="text-xs"
              onClick={regenerate}
              disabled={busy || generatedTitles.length === 0}
            >
              <RefreshCw />
              {generatedSection.regenerateLabel}
            </Button>
          </div>

          <div className="overflow-x-auto">
            {generatedTitles.length > 0 ? (
              <table className="w-full min-w-[640px] text-left text-xs">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    {tableHeaders.map((header) => (
                      <th key={header} className="px-3 py-2 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {generatedTitles.map((text, index) => (
                    <tr
                      key={`${text}-${index}`}
                      onClick={() => setSelected(index)}
                      className={`cursor-pointer border-t border-slate-100 ${
                        selected === index ? "bg-green-50" : "hover:bg-slate-50"
                      }`}
                    >
                      {/* Select */}

                      <td className="px-3">
                        <input
                          type="radio"
                          checked={selected === index}
                          onChange={() => setSelected(index)}
                          className="accent-green-600"
                        />
                      </td>

                      {/* Number */}

                      <td className="px-3 py-3">{index + 1}</td>

                      {/* Title */}

                      <td className="px-3 font-medium text-slate-800">
                        {text}
                      </td>

                      {/* Characters */}

                      <td className="px-3">{text.length}</td>

                      {/* SEO Score */}

                      <td className="px-3">
                        <Badge
                          tone={
                            index < seoScore.successCount
                              ? "success"
                              : "warning"
                          }
                        >
                          {Math.max(
                            0,
                            seoScore.startingScore -
                              index * seoScore.decrementPerIndex,
                          )}
                        </Badge>
                      </td>

                      {/* Copy */}

                      <td className="px-3">
                        <button
                          type="button"
                          aria-label="Copy title"
                          onClick={(event) => {
                            event.stopPropagation();
                            copy(text, index);
                          }}
                          className="rounded p-1.5 hover:bg-slate-100"
                        >
                          {copied === index ? (
                            <Check className="size-4 text-green-600" />
                          ) : (
                            <Clipboard className="size-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
                <div>
                  <Sparkles className="mx-auto mb-3 size-8 text-slate-300" />

                  <h3 className="font-semibold text-slate-700">
                    No titles generated yet
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Fill in the settings and click Generate to create your meta
                    title suggestions.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Selected title */}

          {generatedTitles.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs">
              <span className="text-slate-500">{selectedLabel} </span>

              <b>{selectedTitle}</b>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
