import { Card } from "@/components/ui/card";
import { Clock, Target, LifeBuoy, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Life Timeline",
    description: "Visualize your life's journey with an interactive timeline.",
  },
  {
    icon: Target,
    title: "MISOGI Challenges",
    description: "Set and conquer ambitious yearly challenges.",
  },
  {
    icon: LifeBuoy,
    title: "Goal Tracking",
    description: "Track and achieve your personal and professional goals.",
  },
  {
    icon: BarChart3,
    title: "Personal Analytics",
    description: "Gain insights into your progress and growth.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <feature.icon className="w-12 h-12 mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
