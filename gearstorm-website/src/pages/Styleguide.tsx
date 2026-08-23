import { useState, type ReactNode } from 'react';
import { Alert } from '@/components/common/Alert';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Checkbox } from '@/components/common/Checkbox';
import { Input } from '@/components/common/Input';
import { Modal } from '@/components/common/Modal';
import { Select } from '@/components/common/Select';
import { Skeleton, SkeletonGroup } from '@/components/common/Skeleton';
import { Table, type TableColumn } from '@/components/common/Table';
import { Tag } from '@/components/common/Tag';
import { Textarea } from '@/components/common/Textarea';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { useToast } from '@/hooks/useToast';
import { PageContainer } from '@/components/layout/PageContainer';

interface DemoTeam {
  id: string;
  team: string;
  college: string;
  time: number;
  penalties: number;
}

const DEMO_TEAMS: readonly DemoTeam[] = [
  { id: '1', team: 'Voltage', college: 'KLS GIT', time: 62.4, penalties: 0 },
  { id: '2', team: 'Torque', college: 'RVCE', time: 58.1, penalties: 5 },
  { id: '3', team: 'Circuit', college: 'BMSCE', time: 71.9, penalties: 2 },
  { id: '4', team: 'Axle', college: 'PESIT', time: 66.3, penalties: 0 },
  { id: '5', team: 'Relay', college: 'MSRIT', time: 59.8, penalties: 10 },
];

const COLUMNS: readonly TableColumn<DemoTeam>[] = [
  { key: 'team', label: 'Team', sortable: true },
  { key: 'college', label: 'College', sortable: true },
  {
    key: 'time',
    label: 'Time',
    align: 'right',
    sortable: true,
    render: (row) => `${row.time.toFixed(1)}s`,
  },
  { key: 'penalties', label: 'Penalties', align: 'right', sortable: true },
];

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element => (
  <section className="border-t border-border pt-8">
    <h2 className="mb-6 font-heading text-2xl font-bold">{title}</h2>
    {children}
  </section>
);

/**
 * Living reference for the component library. Registered only in development
 * builds so it never ships to production.
 */
const StyleguidePage = (): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tags, setTags] = useState(['Autonomous', 'Line Follower', 'Sumo']);
  const { toast } = useToast();

  return (
    <PageContainer
      eyebrow="Development only"
      title="Component Styleguide"
      description="Every shared component rendered together so states and spacing stay consistent."
    >
      <div className="flex flex-col gap-12">
        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </Section>

        <Section title="Form controls">
          <div className="grid gap-6 md:grid-cols-2">
            <Input id="sg-name" label="Team name" placeholder="Enter a name" />
            <Input
              id="sg-email"
              label="Email"
              type="email"
              error="Enter a valid email address."
            />
            <Select
              id="sg-college"
              label="College"
              placeholder="Choose a college"
              helperText="Only engineering colleges are eligible."
              options={[
                { value: 'git', label: 'KLS GIT Belagavi' },
                { value: 'rvce', label: 'RVCE Bengaluru' },
                { value: 'bmsce', label: 'BMSCE Bengaluru' },
              ]}
            />
            <Input
              id="sg-disabled"
              label="Disabled"
              disabled
              value="Locked"
              readOnly
            />
            <Textarea
              id="sg-notes"
              label="Bot description"
              placeholder="Describe your drivetrain..."
              className="md:col-span-2"
            />
            <Checkbox id="sg-terms" label="I accept the competition rules." />
            <Checkbox
              id="sg-terms-error"
              label="Required checkbox"
              error="You must accept the rules."
            />
          </div>
        </Section>

        <Section title="Badges and tags">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            {tags.map((tag) => (
              <Tag
                key={tag}
                onRemove={() =>
                  setTags((current) => current.filter((item) => item !== tag))
                }
              >
                {tag}
              </Tag>
            ))}
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Standard" description="Default border and shadow." />
            <Card
              variant="featured"
              title="Featured"
              description="Purple glow for emphasis."
            />
            <FeatureCard
              variant="gradient"
              title="Feature"
              description="Gradient border with hover lift."
              icon={<span className="text-lg font-bold">01</span>}
            />
          </div>
        </Section>

        <Section title="Alerts">
          <div className="flex flex-col gap-3">
            <Alert variant="info" title="Heads up">
              Registration closes in two weeks.
            </Alert>
            <Alert variant="success">Your team has been registered.</Alert>
            <Alert variant="warning">Bot weight is close to the limit.</Alert>
            <Alert variant="error" title="Submission failed">
              Check your connection and try again.
            </Alert>
          </div>
        </Section>

        <Section title="Toasts">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast.success('Team registered!')}>
              Success
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.error('Registration failed')}
            >
              Error
            </Button>
            <Button
              variant="ghost"
              onClick={() => toast.warning('Check your bot dimensions')}
            >
              Warning
            </Button>
            <Button variant="ghost" onClick={() => toast.info('Loading...')}>
              Info
            </Button>
          </div>
        </Section>

        <Section title="Modal">
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm registration"
            description="Review your team details before submitting."
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setModalOpen(false);
                    toast.success('Registration confirmed');
                  }}
                >
                  Confirm
                </Button>
              </>
            }
          >
            <p className="text-text-muted">
              Focus is trapped here. Escape, the close button, and a backdrop
              click all dismiss the dialog.
            </p>
          </Modal>
        </Section>

        <Section title="Table">
          <Table
            data={DEMO_TEAMS}
            columns={COLUMNS}
            rowKey="id"
            caption="Demo leaderboard"
            pageSize={3}
          />
        </Section>

        <Section title="Skeletons">
          <SkeletonGroup label="Loading demo">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Skeleton variant="circle" />
                <Skeleton variant="text" lines={2} className="flex-1" />
              </div>
              <Skeleton variant="rect" />
            </div>
          </SkeletonGroup>
        </Section>
      </div>
    </PageContainer>
  );
};

export default StyleguidePage;
