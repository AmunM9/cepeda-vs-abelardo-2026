"use client";

interface SourceLinkProps {
  href: string;
  label: string;
}

export default function SourceLink({ href, label }: SourceLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="source-link"
    >
      {label}
    </a>
  );
}
