import type { ArticleSection, Locale, ResearchItem, RichArticleContent, Submission } from '@/types';
import { uniqueSlug } from '@/lib/slug';

const localeText = (text: string): Record<Locale, string> => ({
  en: text,
  fr: text,
  pt: text,
  es: text,
});

export function submissionToResearchItem(sub: Submission, slug: string): ResearchItem {
  return {
    id: `pub-${sub.id}`,
    slug,
    title: localeText(sub.title),
    summary: localeText(sub.summary),
    authors: sub.authors,
    organization: sub.organization,
    year: sub.year,
    geographicScope: sub.geographicScope,
    country: sub.country || undefined,
    industrySide: sub.industrySide,
    petroleumChain: sub.petroleumChain,
    category: sub.category,
    contentType: sub.contentType,
    rwgPriorities: sub.rwgPriorities,
    workingGroups: sub.workingGroups,
    subjects: sub.subjects,
    url: sub.url || undefined,
    status: 'published',
    submittedBy: sub.submittedBy,
    tags: sub.tags,
  };
}

export function submissionToRichArticle(sub: Submission, editorBody?: string): RichArticleContent {
  const body: ArticleSection[] = [{ type: 'paragraph', text: localeText(sub.summary) }];

  if (editorBody?.trim()) {
    for (const para of editorBody.split(/\n\n+/).filter(Boolean)) {
      body.push({ type: 'paragraph', text: localeText(para.trim()) });
    }
  }

  const attachments = sub.files.map((file) => ({
    id: file.id,
    label: localeText(file.label),
    fileName: file.fileName,
    url: file.url,
    fileType: file.fileType,
    sizeLabel: file.sizeLabel,
  }));

  return {
    coverImage: sub.coverImageUrl!,
    body,
    attachments,
  };
}

export function slugForSubmission(sub: Submission, existingSlugs: string[]): string {
  if (sub.publishedSlug) return sub.publishedSlug;
  return uniqueSlug(sub.title, existingSlugs);
}
