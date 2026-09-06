import type { TeamRecord } from '../types.js';

const SHEETS_TIMEOUT_MS = 12_000;

/**
 * Forwards a registration to a Google Apps Script web app that appends a row
 * to the organisers’ Sheet. No-op when `GOOGLE_SHEETS_WEBHOOK_URL` is unset.
 * Failures are logged only — registration still succeeds in the JSON store.
 *
 * Apps Script responds with 302 → `script.googleusercontent.com/macros/echo?...`.
 * That echo URL must be fetched with GET (POST returns 405).
 */
export const appendRegistrationToSheet = async (
  team: TeamRecord
): Promise<void> => {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!url) {
    return;
  }

  const membersFlat = team.members
    .map(
      (member) =>
        `${member.role}: ${member.name} (${member.academicYear}) <${member.email}> ${member.phone}`
    )
    .join(' | ');

  const publicBase = process.env.PUBLIC_BASE_URL?.replace(/\/+$/, '') ?? '';
  const paymentProofUrl = publicBase
    ? `${publicBase}${team.paymentProofUrl}`
    : team.paymentProofUrl;

  const payload = JSON.stringify({
    registeredAt: team.registrationDate,
    teamId: team.id,
    teamName: team.name,
    college: team.college,
    contactEmail: team.contactEmail,
    contactPhone: team.contactPhone,
    paymentStatus: team.paymentStatus,
    paymentUtr: team.paymentUtr,
    paymentProofUrl,
    memberCount: team.members.length,
    members: membersFlat,
    membersJson: JSON.stringify(team.members),
  });

  const postResponse = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    redirect: 'manual',
    signal: AbortSignal.timeout(SHEETS_TIMEOUT_MS),
  });

  // Success path: 302 to the echo URL that holds ContentService output.
  if (postResponse.status >= 300 && postResponse.status < 400) {
    const location = postResponse.headers.get('location');
    if (!location) {
      throw new Error(
        `Sheets webhook redirect (${postResponse.status}) missing Location`
      );
    }
    const echoUrl = new URL(location, url).toString();
    const echoResponse = await fetch(echoUrl, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(SHEETS_TIMEOUT_MS),
    });
    if (!echoResponse.ok) {
      const text = await echoResponse.text().catch(() => '');
      throw new Error(
        `Sheets echo HTTP ${echoResponse.status}${text ? `: ${text.slice(0, 200)}` : ''}`
      );
    }
    return;
  }

  if (!postResponse.ok) {
    const text = await postResponse.text().catch(() => '');
    throw new Error(
      `Sheets webhook HTTP ${postResponse.status}${text ? `: ${text.slice(0, 200)}` : ''}`
    );
  }
};
