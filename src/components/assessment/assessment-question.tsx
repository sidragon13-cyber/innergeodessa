export interface AssessmentQuestionProps {
  eyebrow: string;
  wording: string;
}

export function AssessmentQuestion({
  eyebrow,
  wording,
}: AssessmentQuestionProps) {
  return (
    <>
      <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#a64a2c]">
        {eyebrow}
      </p>

      <h1 className="mb-12 font-serif text-4xl leading-tight md:text-5xl">
        {wording}
      </h1>
    </>
  );
}
