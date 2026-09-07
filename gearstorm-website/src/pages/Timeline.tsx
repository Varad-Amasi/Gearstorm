import { TimelineSection } from '@/components/sections/TimelineSection';
import { PageContainer } from '@/components/layout/PageContainer';
import { EVENT_TIMELINE, TIMELINE_FOOTNOTE } from '@/data/timeline';

const TimelinePage = (): JSX.Element => (
  <PageContainer
    eyebrow="Event day"
    title="Timeline"
    description="How GearStorm 2.0 is structured for Beginner and Advanced, from arrival through each category’s Final. Clock times are posted when registration opens."
  >
    <TimelineSection
      title="From desk to results"
      items={EVENT_TIMELINE}
      footnote={TIMELINE_FOOTNOTE}
      contained={false}
    />
  </PageContainer>
);

export default TimelinePage;
