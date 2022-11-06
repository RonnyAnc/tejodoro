import { Session } from './Session';

export interface SessionRepository {
  get(name: string): Promise<Session> | null;
  save(session: Session): Promise<void>;
}
