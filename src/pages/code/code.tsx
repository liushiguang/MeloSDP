import React, { useState } from 'react';
import SourceCode from "@/components/sourceCode/sourceCode";
import Suggestion from "@/components/suggestion/suggestion";
import './code.scss'; // 添加自定义样式
import { message } from 'antd';
import { codeTest } from '@/apis/codeAPI';

const Code: React.FC = () => {
  const [modifiedCode, setModifiedCode] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileContent(reader.result);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadCode = () => {
    if (!fileContent) {
      message.error("请先选择文件")
    }
    else{
      message.success("上传成功~")
    }
  };

  const handleStartTest = async () => {
    setSuggestions([]);
    if(fileContent){
      const formData = new FormData();
      formData.append('file', new Blob([fileContent], { type: 'text/plain' }));
      
      // 发起请求
      const data = await codeTest(formData);
      console.log(data)

      setModifiedCode('<div>Hello World - Modified</div>');
    }
    else{
      message.error("请先上传代码")
    }

  };

  const handleGiveSuggestion = () => {
    if(fileContent){
      setSuggestions(['Suggestion 1', 'Suggestion 2', 'Suggestion 3']);
    }
    else{
      message.error("请先上传代码进行测试")
    }
  };

  return (
    <div className="code-container">
      <div className="left-section">
        <div className="button-group">
            <label className="file-upload-label">
              <input type="file" accept=".py" onChange={handleFileChange} />
              <span className="file-upload-text">选择Python文件</span>
            </label>
          <button onClick={handleUploadCode}>上传代码</button>
          <button onClick={handleStartTest}>开始测试</button>
        </div>
        <SourceCode code={modifiedCode} />
      </div>
      <div className="middle-section">
        <button onClick={handleGiveSuggestion}>给出建议</button>
      </div>
      <div className="right-section">
        {suggestions.map((suggestion, index) => (
          <Suggestion key={index} modifiedCode={suggestion} />
        ))}
      </div>
    </div>
  );
};

export default Code;
