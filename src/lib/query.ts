// TODO: implement queryWaypoint() with your LLM provider
// See docs/how-to/setup-ai-query.md

export interface WaypointQuery {
  question: string;
  outlet: 'web' | 'messenger' | 'llm';
}

export interface WaypointQueryResult {
  type: 'ui' | 'text' | 'card';
  content: unknown;
}
