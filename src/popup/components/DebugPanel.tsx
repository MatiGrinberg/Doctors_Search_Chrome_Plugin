import React from 'react';
import { AuditLog } from '../../shared/types';

interface Props {
  auditLog: AuditLog;
}

export default function DebugPanel({ auditLog }: Props) {
  const handleDownload = () => {
    const jsonStr = JSON.stringify(auditLog, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-500">
        IA: {auditLog.llmProviderUsed} | Err: {auditLog.errors.length}
      </span>
      <button 
        onClick={handleDownload}
        className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 py-1 px-3 rounded-full transition-colors font-medium flex items-center space-x-1"
        title="Descargar JSON de Auditoría"
      >
        <span>Descargar Debug JSON</span>
      </button>
    </div>
  );
}
