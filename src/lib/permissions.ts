import type { SubmissionStatus, UserRole } from '@/types';

/** Roles that can access the admin workspace area. */
export function canAccessAdmin(role: UserRole): boolean {
  return ['owner', 'administrator', 'editor', 'reviewer'].includes(role);
}

/** Roles that can approve/reject submissions and membership requests. */
export function canReviewSubmissions(role: UserRole): boolean {
  return ['owner', 'administrator', 'reviewer'].includes(role);
}

/** Roles that can compose and publish approved submissions. */
export function canPublishSubmissions(role: UserRole): boolean {
  return ['owner', 'administrator', 'editor'].includes(role);
}

/** Roles that can approve/reject membership registrations. */
export function canApproveMemberships(role: UserRole): boolean {
  return ['owner', 'administrator', 'reviewer'].includes(role);
}

export function canManageTeam(role: UserRole): boolean {
  return role === 'owner';
}

/** Submissions waiting for reviewer action. */
export function isInReviewQueue(status: SubmissionStatus): boolean {
  return status === 'submitted' || status === 'under_review';
}

/** Submissions ready for editor publishing. */
export function isAwaitingPublish(status: SubmissionStatus): boolean {
  return status === 'approved';
}

/** Count of items relevant to a role's admin badge. */
export function adminQueueCountForRole(
  role: UserRole,
  counts: { inReview: number; awaitingPublish: number; pendingRegistrations: number },
): number {
  if (canReviewSubmissions(role)) {
    return counts.inReview + (canPublishSubmissions(role) ? counts.awaitingPublish : 0) + counts.pendingRegistrations;
  }
  if (canPublishSubmissions(role)) {
    return counts.awaitingPublish;
  }
  return 0;
}
