import React, { useState } from 'react';
import GeneratorPanel from '../components/GeneratorPanel';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import HistoryList from '../components/HistoryList';
import ExportModal from '../components/ExportModal';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Main dashboard experience: generate, edit, preview, export */
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);

  const onContentReady = (data) => {
    setContent(data.content || '');
    setPostId(data.id || null);
  };

  const onSaved = (data) => {
    setPostId(data.id || postId);
    // Optionally show toast
  };

  return (
    <section className="retro-section">
      <h2>Dashboard</h2>
      <div className="retro-columns">
        <div className="retro-col">
          <GeneratorPanel onContentReady={onContentReady} />
          <HistoryList onSelect={(it) => { setPostId(it.id); setContent(it.content || ''); }} />
        </div>
        <div className="retro-col">
          <Editor value={content} setValue={setContent} postId={postId} onSaved={onSaved} />
          <Preview content={content} />
          <div className="retro-row end">
            <button className="btn-retro" onClick={() => setExportOpen(true)}>Export</button>
          </div>
        </div>
      </div>
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} content={content} postId={postId} />
    </section>
  );
}
