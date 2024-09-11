import React from 'react';
import './sourceCode.scss'

// 定义组件的属性类型
interface SourceCodeProps {
  code: string;
}

// 用于处理源代码的函数
const highlightCode = (code: string) => {
  const regex = /(<[^>]*>)/g; // 正则表达式匹配所有被<>括起来的部分
  return code.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="highlighted">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

const SourceCode: React.FC<SourceCodeProps> = ({ code }) => {
  return (
    <div className='codeContainer'>
      <pre className='codeBlock'>
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
};

export default SourceCode;