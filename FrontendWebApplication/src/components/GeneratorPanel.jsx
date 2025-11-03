import React, { useState } from 'react';
import { apiPost } from '../api/client';

// PUBLIC_INTERFACE
export default function GeneratorPanel({ onContentReady }) {
  /** Handles generator call and displays a preview snippet */
  const [loading, setLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState(null);
  const [error, setError] = useState(null);

  const onGenerate = async (payload) => {
    setError(null);
    setLoading(true);
    setLastPrompt(payload);
    try {
      // TODO: Replace with real backend endpoint
      // expected POST /generate {topic, keywords, tone, length}
      let data;
      try {
        data = await apiPost('/generate', payload);
      } catch (e) {
        const fake = `Title: ${payload.topic}\n\n${payload.tone} ${payload.length} article about ${payload.topic}.\n\n- Keyword focus: ${payload.keywords.join(', ') || 'n/a'}\n\nIntro...\n\nSection 1...\n\nConclusion...`;
        data = { content: fake, id: `local-${Date.now()}` };
      }
      onContentReady(data);
    } catch (e) {
      setError(e.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h3 className="retro-heading">Generator</h3>
      {error && <div className="retro-error">{error}</div>}
      <div className="retro-stack">
        {React.createElement(require('./TopicForm').default, { onGenerate })}
      </div>
      {loading && <div className="retro-loading">Thinking...</div>}
      {lastPrompt && !loading && <div className="retro-hint">Last prompt: {lastPrompt.topic}</div>}
    </section>
  );
}
