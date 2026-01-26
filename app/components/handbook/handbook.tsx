import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Accordion, AccordionContent, AccordionTrigger } from '~/components/ui/accordion';
import { AccordionItem } from '@radix-ui/react-accordion';
import { type Lesson, LESSONS } from '~/config/lessons';
import { useState } from 'react';

export const Handbook = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>();
  const [content, setContent] = useState('');

  const onLessonChange = (title: string) => {
    const lesson = LESSONS.find((l) => l.title === title);
    if (!lesson) {
      return;
    }

    setSelectedLesson(lesson);
    lesson.loader().then((x) => {
      setContent(x);
    });
  };

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        onValueChange={(v) => onLessonChange(v)}
        className="max-w-2xl rounded-lg border bg-card shadow-sm"
      >
        {LESSONS.map((l) => (
          <AccordionItem key={l.title} value={l.title} className="border-b px-4 last:border-b-0">
            <AccordionTrigger>{l.title}</AccordionTrigger>
            <AccordionContent>
              {selectedLesson?.title === l.title && (
                <div className="reset-tw markdown">
                  <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
