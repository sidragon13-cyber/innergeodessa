export interface AssessmentQuestionProps {
  eyebrow: string;
  wording: string;
}

export function AssessmentQuestion({
  eyebrow,
  wording,
}: AssessmentQuestionProps) {
  return (
    <header className="mb-12">
      <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#a64a2c]">
        {eyebrow}
      </p>

      <h1 className="max-w-3xl font-serif text-4xl font-normal leading-tight tracking-[-0.04em] md:text-5xl">
        {wording}
      </h1>
    </header>
  );
}
