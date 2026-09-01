'use client';

import Image from 'next/image';
import type { ArticleSection, Locale } from '@/types';

export function ArticleBody({ sections, locale }: { sections: ArticleSection[]; locale: Locale }) {
  return (
    <div className="ggon-article-body space-y-7 text-[#444]">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'heading':
            if (section.level === 2) {
              return (
                <h2
                  key={index}
                  className="ggon-section-title mt-10 border-b border-[#e0e0e0] pb-3 text-2xl font-bold text-[#242424]"
                >
                  {section.text[locale]}
                </h2>
              );
            }
            return (
              <h3 key={index} className="ggon-label mt-8 text-lg text-[#1a6b7a]">
                {section.text[locale]}
              </h3>
            );
          case 'paragraph':
            return (
              <p key={index} className="text-base leading-[1.8] text-[#444]">
                {section.text[locale]}
              </p>
            );
          case 'quote':
            return (
              <blockquote
                key={index}
                className="relative border border-[#d4e8ec] bg-gradient-to-br from-[#f5fafb] to-[#fef9f5] px-6 py-5 pl-8"
              >
                <p className="text-lg font-medium italic leading-relaxed text-[#333]">
                  {section.text[locale]}
                </p>
                {section.attribution && (
                  <footer className="mt-3 border-t border-[#d4e8ec] pt-3 text-sm not-italic text-[#1a6b7a]">
                    — {section.attribution[locale]}
                  </footer>
                )}
              </blockquote>
            );
          case 'list': {
            const Tag = section.ordered ? 'ol' : 'ul';
            const listClass = section.ordered ? 'list-decimal' : 'list-none';
            return (
              <Tag key={index} className={`${listClass} space-y-3 pl-0 text-base leading-relaxed`}>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={section.ordered ? 'ml-5' : 'flex gap-3'}>
                    {!section.ordered && (
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c45c26]"
                        aria-hidden
                      />
                    )}
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </Tag>
            );
          }
          case 'image':
            return (
              <figure
                key={index}
                className="my-10 overflow-hidden border border-[#dcdcdc] bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={section.src}
                    alt={section.alt[locale]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </div>
                {section.caption && (
                  <figcaption className="border-t border-[#e8e8e8] bg-[#fafafa] px-5 py-3 text-sm leading-relaxed text-[#666]">
                    {section.caption[locale]}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
