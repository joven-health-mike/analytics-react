// Copyright 2024 Social Fabric, LLC

export interface ISessionProcessor {
  processNewSession(session: any): void
  finalize(): void
}
