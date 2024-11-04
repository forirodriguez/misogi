import { LifeCalculator } from "./life-calculator";

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Your Life Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Calculate your remaining Misogi challenges and mini adventures based
            on your age and location. Each year brings new opportunities for
            transformation.
          </p>
        </div>

        <LifeCalculator />
      </div>
    </section>
  );
}
