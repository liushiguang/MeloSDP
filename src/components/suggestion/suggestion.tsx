import React from 'react';
import './suggestion.scss';

interface SugesstionProps {
  modifiedCode: string;
}

const Suggestion: React.FC<SugesstionProps> = ({ modifiedCode }) => {
  return (
    <div className="code-review-comment">
      <h2>修改建议</h2>
      <pre className="code-block">
        <code>{modifiedCode}</code>
      </pre>
    </div>
  );
}

export default Suggestion;
