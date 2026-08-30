import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Alert } from '@/components/common/Alert';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Modal } from '@/components/common/Modal';
import { Select } from '@/components/common/Select';
import { Skeleton } from '@/components/common/Skeleton';
import { Table, type TableColumn } from '@/components/common/Table';
import { PageContainer } from '@/components/layout/PageContainer';
import { useLeaderboardRealtime } from '@/hooks/useLeaderboardRealtime';
import { API_ENDPOINTS } from '@/config/api';
import { apiClient, getErrorMessage, unwrap } from '@/services/apiClient';
import { useLeaderboardStore } from '@/store/leaderboardStore';
import type {
  ApiResponse,
  LeaderboardEntryDto,
  PublicTeamDto,
} from '@/types/api';
import { formatRaceTime } from '@/utils/formatters';

const ROUND_OPTIONS = [
  { value: '1', label: 'Round 1 — Qualifiers' },
  { value: '2', label: 'Round 2 — Finals' },
] as const;

const LeaderboardPage = (): JSX.Element => {
  const selectedRound = useLeaderboardStore((state) => state.selectedRound);
  const search = useLeaderboardStore((state) => state.search);
  const college = useLeaderboardStore((state) => state.college);
  const setSelectedRound = useLeaderboardStore(
    (state) => state.setSelectedRound
  );
  const setSearch = useLeaderboardStore((state) => state.setSearch);
  const setCollege = useLeaderboardStore((state) => state.setCollege);

  const [searchDraft, setSearchDraft] = useState(search);
  const [selected, setSelected] = useState<LeaderboardEntryDto | null>(null);

  const { data, isLoading, isError, error, isFetching, isSuccess, newIds } =
    useLeaderboardRealtime(selectedRound, search, college);

  const teamsQuery = useQuery({
    queryKey: ['teams', 'public'],
    queryFn: async () => {
      const { data: payload } = await apiClient.get<
        ApiResponse<PublicTeamDto[]>
      >(API_ENDPOINTS.TEAMS);
      return unwrap(payload);
    },
    staleTime: 60_000,
  });

  const collegeOptions = useMemo(() => {
    const fromTeams = (teamsQuery.data ?? []).map((team) => team.college);
    const fromBoard = (data?.entries ?? []).map((entry) => entry.college);
    const colleges = Array.from(
      new Set([...fromTeams, ...fromBoard, ...(college ? [college] : [])])
    ).sort((a, b) => a.localeCompare(b));
    return [
      { value: '', label: 'All colleges' },
      ...colleges.map((name) => ({ value: name, label: name })),
    ];
  }, [college, data?.entries, teamsQuery.data]);

  const columns = useMemo<TableColumn<LeaderboardEntryDto>[]>(
    () => [
      {
        key: 'rank',
        label: 'Rank',
        sortable: true,
        render: (row) => (
          <span className="inline-flex items-center gap-2 font-heading font-semibold">
            #{row.rank}
            {newIds.includes(row.id) ? (
              <Badge variant="accent">New</Badge>
            ) : null}
          </span>
        ),
      },
      {
        key: 'teamName',
        label: 'Team',
        sortable: true,
        render: (row) => (
          <div>
            <p className="font-heading font-semibold">{row.teamName}</p>
            <p className="text-sm text-text-subtle">{row.college}</p>
          </div>
        ),
      },
      {
        key: 'time',
        label: 'Raw time',
        sortable: true,
        align: 'right',
        render: (row) => formatRaceTime(row.time),
      },
      {
        key: 'obstaclesCleared',
        label: 'Cleared',
        sortable: true,
        align: 'right',
      },
      {
        key: 'penaltyPoints',
        label: 'Penalties',
        sortable: true,
        align: 'right',
        render: (row) => `${row.penaltyPoints}s`,
      },
      {
        key: 'totalScore',
        label: 'Adjusted',
        sortable: true,
        align: 'right',
        render: (row) => (
          <span className="font-heading font-semibold text-accent">
            {formatRaceTime(row.totalScore)}
          </span>
        ),
      },
    ],
    [newIds]
  );

  return (
    <PageContainer
      eyebrow="Live Results"
      title="Leaderboard"
      description="Rankings for both rounds with times, obstacles cleared, penalties, and adjusted time."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          {isLoading ? (
            <Badge variant="info">Connecting…</Badge>
          ) : isError ? (
            <Badge variant="warning">API offline</Badge>
          ) : isSuccess ? (
            <Badge variant="success">
              {isFetching ? 'Refreshing…' : 'Live · polls every 30s'}
            </Badge>
          ) : null}
          {data?.updatedAt ? (
            <p className="text-sm text-text-subtle">
              Updated {new Date(data.updatedAt).toLocaleTimeString()}
              {typeof data.total === 'number'
                ? ` · ${data.entries.length} of ${data.total}`
                : null}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_1.2fr_1fr_auto] md:items-end">
          <Select
            id="leaderboard-round"
            label="Round"
            options={ROUND_OPTIONS}
            value={String(selectedRound)}
            onChange={(event) => {
              setSelectedRound(event.target.value === '2' ? 2 : 1);
            }}
          />
          <form
            className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              setSearch(searchDraft.trim());
            }}
          >
            <Input
              id="leaderboard-search"
              label="Search team"
              value={searchDraft}
              onChange={(event) => {
                setSearchDraft(event.target.value);
              }}
              placeholder="Team name"
            />
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto"
            >
              Search
            </Button>
          </form>
          <Select
            id="leaderboard-college"
            label="College"
            options={collegeOptions}
            value={college}
            onChange={(event) => {
              setCollege(event.target.value);
            }}
          />
        </div>

        {isError ? (
          <Alert variant="error" title="Could not load leaderboard">
            {getErrorMessage(error)}. Start the API with{' '}
            <code className="text-text-light">cd backend && npm run dev</code>.
          </Alert>
        ) : null}

        {isLoading ? (
          <div className="flex flex-col gap-3">
            <Skeleton variant="rect" className="h-12" />
            <Skeleton variant="rect" className="h-64" />
          </div>
        ) : (
          <Table
            data={data?.entries ?? []}
            columns={columns}
            rowKey="id"
            caption={`Round ${selectedRound} leaderboard`}
            emptyMessage="No teams match these filters yet."
            pageSize={50}
            onRowClick={setSelected}
          />
        )}
      </div>

      <Modal
        open={selected !== null}
        onClose={() => {
          setSelected(null);
        }}
        title={selected?.teamName ?? 'Team details'}
        description={selected ? selected.college : undefined}
        size="md"
      >
        {selected ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-text-subtle">Rank</dt>
              <dd className="font-heading text-lg font-semibold">
                #{selected.rank}
              </dd>
            </div>
            <div>
              <dt className="text-text-subtle">Round</dt>
              <dd>{selected.round}</dd>
            </div>
            <div>
              <dt className="text-text-subtle">Raw time</dt>
              <dd>{formatRaceTime(selected.time)}</dd>
            </div>
            <div>
              <dt className="text-text-subtle">Adjusted time</dt>
              <dd className="font-semibold text-accent">
                {formatRaceTime(selected.totalScore)}
              </dd>
            </div>
            <div>
              <dt className="text-text-subtle">Obstacles cleared</dt>
              <dd>{selected.obstaclesCleared}</dd>
            </div>
            <div>
              <dt className="text-text-subtle">Penalties</dt>
              <dd>{selected.penaltyPoints}s</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-text-subtle">Recorded</dt>
              <dd>{new Date(selected.timestamp).toLocaleString()}</dd>
            </div>
          </dl>
        ) : null}
      </Modal>
    </PageContainer>
  );
};

export default LeaderboardPage;
