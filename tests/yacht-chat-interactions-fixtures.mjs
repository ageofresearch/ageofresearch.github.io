// Wire-format fixtures follow Google's documented Interactions SSE event contract.
export const created = () => ({ event_type: 'interaction.created', interaction: { model: 'gemini-4-hydrogen', status: 'in_progress' } });
export const modelStart = (index = 0) => ({ event_type: 'step.start', index, step: { type: 'model_output' } });
export const textDelta = (text, index = 0) => ({ event_type: 'step.delta', index, delta: { type: 'text', text } });
export const stepStop = (index = 0) => ({ event_type: 'step.stop', index });
export const completion = (status = 'completed') => ({ event_type: 'interaction.completed', interaction: { status } });
export const textEvents = (text = 'La comprobación sigue pendiente.') => [created(), modelStart(), textDelta(text), stepStop(), completion()];
export const encodeEvents = value => (Array.isArray(value) ? value : [value]).map(event =>
  'event: ' + (event.event_type || (event.error ? 'error' : 'malformed')) + '\ndata: ' + JSON.stringify(event) + '\n\n').join('');
export const interactionResponse = (value = textEvents(), status = 200) => new Response(encodeEvents(value), {
  status, headers: { 'content-type': 'text/event-stream' },
});
