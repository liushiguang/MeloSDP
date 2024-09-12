import React from 'react';
import './suggestion.scss';

interface SugesstionProps {
  index:number,
  modifiedCode: string;
}

const highlightCode = (code:string) => {
  // 替换 // 注释
  let highlightedCode = code.replace(/(\/\/.*$)/gm, '<span class="comment">\$1</span>');
  // 替换 # 注释
  highlightedCode = highlightedCode.replace(/(#.*$)/gm, '<span class="comment">\$1</span>');
  return highlightedCode;
};

const Suggestion: React.FC<SugesstionProps> = ({ index,modifiedCode }) => {
  const highlightedCode = highlightCode(modifiedCode);
  return (
    <div className="code-review-comment">
      <h2>修改建议 {index}:</h2>
      <pre className="code-block">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}

export default Suggestion;
