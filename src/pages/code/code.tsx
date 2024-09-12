import React, { useState } from 'react';
import SourceCode from "@/components/sourceCode/sourceCode";
import Suggestion from "@/components/suggestion/suggestion";
import './code.scss'; // 添加自定义样式
import { message } from 'antd';
import { codeTest, suggestionTest } from '@/apis/codeAPI';

const Code: React.FC = () => {
  const [modifiedCode, setModifiedCode] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      
      const extension = file.name.split('.').pop();
      setFileExtension(extension || null);

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
      formData.append('fileExtension', fileExtension || '');

      // 发起请求
      const data = await codeTest(formData);
      console.log(data.data)
      setModifiedCode(data.data)

      // const exampleText = `<code>int main() {
      //   int x = "$"Hello"$"; // Error: assigning a string to an integer variable
      //   return 0;
      //   # 你好
      //   }</code>
      //   <code>
      //   double t = 1 ;
      //   </code>
      //    <text>The error occurs because in C++, you cannot assign a string literal to an integer variable. The variable x is declared as an integer, but the value "Hello" is a string. This will cause a compilation error because C++ does not support implicit conversion from string to integer. To fix this, you should assign a numeric value to x, such as int x = 5; or use a different data type, such as char x = 'H'; if you want to store a single character.</text>`;
      // setModifiedCode(exampleText);

    }
    else{
      message.error("请先上传代码")
    }

  };

  const handleGiveSuggestion = async () => {
    if(fileContent){
      const formData = new FormData();
      formData.append('modifiedCode', modifiedCode);

      const data  = await suggestionTest(formData);
      console.log(data.data)
      
      setSuggestions(splitSuggestions(data.data));
    }
    else{
      message.error("请先上传代码进行测试")
    }
  };

    const splitSuggestions = (data: string): string[] => {
    const regex = /<text>\d+\. Repair suggestion \d+: <\/text>\s*<code>(.*?)<\/code>/gs;
    const matches = [...data.matchAll(regex)];
    return matches.map(match => match[1].trim());
  };

  return (
    <div className="code-container">
      <div className="left-section">
        <div className="button-group">
            <label className="file-upload-label">
              <input type="file" onChange={handleFileChange} />
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
          <Suggestion key={index} modifiedCode={suggestion} index={index+1} />
        ))}
      </div>
    </div>
  );
};

export default Code;
