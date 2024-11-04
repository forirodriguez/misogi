import Link from "next/link";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#timeline", label: "Timeline" },
  { href: "#challenge", label: "MISOGI Challenge" },
  { href: "#pricing", label: "Pricing" },
];

export function Navigation({ className = "" }: { className?: string }) {
  return (
    <div className={`space-x-6 items-center ${className}`}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-purple-500 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
