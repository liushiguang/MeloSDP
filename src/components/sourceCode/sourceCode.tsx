import React from 'react';
import './sourceCode.scss'

// 定义组件的属性类型
interface SourceCodeProps {
  code: string;
}

const highlightCode = (code: string): string => {
  // 1. 提取 <code> 或 <text> 标签内的内容
  const codeContent = code.match(/<code>(.*?)<\/code>|<text>(.*?)<\/text>/gs);

  if (!codeContent) {
    return code; // 如果没有找到匹配的内容，直接返回原始字符串
  }

  // 2. 对每个匹配的内容进行处理
  const processedCode = codeContent.map((content) => {
    let extractedContent = content.replace(/<\/?(code|text)>/g, ''); // 去掉 <code> 和 <text> 标签

    // 3. 将被 "$" 包裹的部分提取出来，并删除 "$"
    extractedContent = extractedContent.replace(/"\$\"\s*([^"]*?)\s*\"\$"/g, '<span style="color: red;">\$1</span>');

    // 4. 将以 // 或 # 开头的注释标为绿色
    extractedContent = extractedContent.replace(/(\/\/.*|#.*)/g, '<span style="color: green;">\$1</span>');

    return extractedContent;
  });

  // 将处理后的代码片段重新拼接为字符串并返回
  return processedCode.join('\n');
};



const SourceCode: React.FC<SourceCodeProps> = ({ code }) => {
  return (
    <div className='codeContainer'>
      <pre className='codeBlock'>
      <code style={{fontSize:18}} dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  );
};

export default SourceCode;