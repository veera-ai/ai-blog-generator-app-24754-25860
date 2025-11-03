import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function TopicForm({ onGenerate }) {
  /** Collect topic/keywords/tone/length to trigger generator */
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('informative');
  const [length, setLength] = useState('medium');

  return (
    <form
      className="retro-panel"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate({ topic, keywords: keywords.split(',').map(s => s.trim()).filter(Boolean), tone, length });
      }}
    >
      <div className="retro-field">
        <label>Topic</label>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Benefits of Static Site Generators" required />
      </div>
      <div className="retro-field">
        <label>Keywords (comma separated)</label>
        <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="jamstack, seo, performance" />
      </div>
      <div className="retro-row">
        <div className="retro-field">
          <label>Tone</label>
          <select value={tone} onChange={e => setTone(e.target.value)}>
            <option value="informative">Informative</option>
            <option value="casual">Casual</option>
            <option value="technical">Technical</option>
            <option value="persuasive">Persuasive</option>
          </select>
        </div>
        <div className="retro-field">
          <label>Length</label>
          <select value={length} onChange={e => setLength(e.target.value)}>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
      </div>
      <button className="btn-retro" type="submit">Generate</button>
    </form>
  );
}
