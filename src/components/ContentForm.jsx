import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import Card from "./ui/Card.jsx";
import Button from "./ui/Button.jsx";
import { contentFormOptions } from "../data/mock.js";

export const inputCls =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-green-500";

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
      </span>

      {children}
    </label>
  );
}

export function TagInput({ initial = [], value, onChange }) {
  const [internalTags, setInternalTags] = useState(initial);
  const [v, setV] = useState("");

  const tags = value !== undefined ? value : internalTags;

  const updateTags = (newTags) => {
    if (onChange) {
      onChange(newTags);
    } else {
      setInternalTags(newTags);
    }
  };

  const addTag = () => {
    const tag = v.trim();

    if (!tag || tags.includes(tag)) {
      return;
    }

    updateTags([...tags, tag]);

    setV("");
  };

  const removeTag = (tagToRemove) => {
    updateTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="rounded-lg border border-slate-200 p-2">
      <div className="flex flex-wrap gap-1">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium"
          >
            {t}

            <button
              type="button"
              onClick={() => removeTag(t)}
              aria-label={`Remove ${t}`}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}

        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder="Add keyword..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          className="min-w-[90px] flex-1 text-xs outline-none"
        />
      </div>
    </div>
  );
}

export default function ContentForm({ onGenerate, generating }) {
  const [formData, setFormData] = useState({
    contentType: contentFormOptions.defaultContentType,
    primaryKeyword: contentFormOptions.defaultPrimaryKeyword,
    secondaryKeywords: contentFormOptions.defaultSecondaryKeywords,
    targetAudience: contentFormOptions.defaultTargetAudience,
    tone: contentFormOptions.defaultTone,
    length: contentFormOptions.defaultLength,
    instructions: contentFormOptions.defaultInstructions,
  });

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onGenerate?.(formData);
  };

  return (
    <Card className="p-4">
      <h2 className="mb-4 font-bold text-slate-900">Create New Content</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Field label="Content Type">
          <select
            className={inputCls}
            value={formData.contentType}
            onChange={(e) => updateField("contentType", e.target.value)}
          >
            {contentFormOptions.contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Primary Keyword">
          <input
            className={inputCls}
            value={formData.primaryKeyword}
            onChange={(e) => updateField("primaryKeyword", e.target.value)}
          />
        </Field>

        <Field label="Secondary Keywords">
          <TagInput
            value={formData.secondaryKeywords}
            onChange={(tags) => updateField("secondaryKeywords", tags)}
          />
        </Field>

        <Field label="Target Audience">
          <select
            className={inputCls}
            value={formData.targetAudience}
            onChange={(e) => updateField("targetAudience", e.target.value)}
          >
            {contentFormOptions.targetAudiences.map((audience) => (
              <option key={audience} value={audience}>
                {audience}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Tone">
            <select
              className={inputCls}
              value={formData.tone}
              onChange={(e) => updateField("tone", e.target.value)}
            >
              {contentFormOptions.tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Length">
            <select
              className={inputCls}
              value={formData.length}
              onChange={(e) => updateField("length", e.target.value)}
            >
              {contentFormOptions.lengths.map((length) => (
                <option key={length} value={length}>
                  {length}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Additional Instructions">
          <textarea
            rows={3}
            className={`${inputCls} h-auto py-2`}
            placeholder="Include statistics and actionable tips..."
            value={formData.instructions}
            onChange={(e) => updateField("instructions", e.target.value)}
          />
        </Field>

        <Button type="submit" className="h-11 w-full" disabled={generating}>
          <Sparkles />

          {generating ? "Generating..." : "Generate with AI"}
        </Button>
      </form>
    </Card>
  );
}
