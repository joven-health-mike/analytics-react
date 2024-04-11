export interface ISessionProcessor {
  processNewSession(session: any): void
  finalize(): void
}
