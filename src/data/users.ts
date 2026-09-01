import type { User } from '@/types';

export const demoUsers: User[] = [
  {
    id: 'u1',
    name: 'Portal Owner',
    email: 'owner@ggon.demo',
    organization: 'GGON Secretariat',
    role: 'owner',
    approved: true,
    bio: 'Full system control including role management.',
  },
  {
    id: 'u2',
    name: 'Admin User',
    email: 'admin@ggon.demo',
    organization: 'GGON Secretariat',
    role: 'administrator',
    approved: true,
    bio: 'Approvals, content management, and site configuration.',
  },
  {
    id: 'u3',
    name: 'Editor User',
    email: 'editor@ggon.demo',
    organization: 'Research Working Group',
    role: 'editor',
    approved: true,
    bio: 'Creates and edits research content and narratives.',
  },
  {
    id: 'u4',
    name: 'Reviewer User',
    email: 'reviewer@ggon.demo',
    organization: 'Research Working Group',
    role: 'reviewer',
    approved: true,
    bio: 'Reviews submissions and membership requests.',
  },
  {
    id: 'u5',
    name: 'Member User',
    email: 'member@ggon.demo',
    organization: 'Climate Action Network',
    role: 'member',
    approved: true,
    bio: 'GGON network member — can search, submit, and connect.',
  },
];

export const DEMO_PASSWORD = 'demo123';
