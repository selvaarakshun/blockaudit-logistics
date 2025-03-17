
export interface AuditEvent {
  id: string;
  type: 'document' | 'user' | 'system';
  action: string;
  timestamp: string;
  user: string;
  details: string;
  verified: boolean;
  hash?: string;
}
