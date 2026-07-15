import { trace, context, SpanStatusCode, type Span } from "@opentelemetry/api";

const tracer = trace.getTracer("nested-backend");

/** Wrap any async operation in a span. Cheap no-op when no OTel exporter configured. */
export async function traced<T>(name: string, fn: (span: Span) => Promise<T>, attrs: Record<string, string | number> = {}): Promise<T> {
  return tracer.startActiveSpan(name, async (span) => {
    for (const [k, v] of Object.entries(attrs)) span.setAttribute(k, v);
    try {
      const out = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return out;
    } catch (err) {
      span.recordException(err as Error);
      span.setStatus({ code: SpanStatusCode.ERROR, message: (err as Error).message });
      throw err;
    } finally {
      span.end();
    }
  });
}

export { trace, context };
