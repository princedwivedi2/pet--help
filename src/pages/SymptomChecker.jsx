// Placeholder icons: Replace with IconScout pastel icons
const symptoms = [
  { icon: '🐾', label: 'Limping' },
  { icon: '🤒', label: 'Fever' },
  { icon: '🤢', label: 'Vomiting' },
  { icon: '💧', label: 'Diarrhea' },
  { icon: '😴', label: 'Lethargy' },
  { icon: '😤', label: 'Breathing' },
  { icon: '🦷', label: 'Dental' },
  { icon: '👂', label: 'Ear' },
];

export default function SymptomChecker() {
  return (
    <section className="min-h-screen bg-background flex flex-col items-center py-8 px-2">
      <h2 className="font-heading text-3xl text-primary mb-6">Symptom Checker</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-2xl">
        {symptoms.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white rounded-xl shadow-card p-6 hover:shadow-soft transition cursor-pointer"
          >
            <span className="text-4xl mb-2">{s.icon}</span>
            <span className="text-secondary font-bold">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
