import React, { useState ,MouseEvent} from 'react';
import EChartsReact from 'echarts-for-react';
import './data.scss'
import { dataTest } from '@/apis/dataAPI';

const Metrics = ['AUC', 'Accuracy', 'F1', 'Precision', 'Recall'];
const DLModels = ['FCFNN', 'CNN'];
const MLModels = ['SVM', 'RF', 'NBC','KM'];

function sortMetrics(selectedMetrics:string[]) {
  return selectedMetrics.sort((a, b) => Metrics.indexOf(a) - Metrics.indexOf(b));
}

const Data: React.FC = () => {
    // 保存当前选择的模型和指标
    const [selectedMLModels, setSelectedMLModels] = useState<string[]>([]);
    const [selectedDLModels, setSelectedDLModels] = useState<string[]>([]);
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<'无监督学习' | '监督学习'>('无监督学习'); // 添加选择类型的状态

    const [appliedMetrics,setAppliedMetrics] = useState<string[]>([]);
  
    // // csv格式文件
    // const [file, setFile] = useState<File | null>(null);

    // 图表数据
    const [chartData, setChartData] = useState<DataTypes[]>([]);

    // 选择文件变化
    // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //   if (event.target.files && event.target.files[0]) {
    //     setFile(event.target.files[0]);
    //   }
    // };

    // 处理模型选择变化
    const handleModelChange = (model: string, setSelectedModels: React.Dispatch<React.SetStateAction<string[]>>) => {
      setSelectedModels((prev) =>
        prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
      );
    };
  
    // 处理指标选择
    const handleMetricChange = (metric: string) => {
      setSelectedMetrics((prev) =>
        prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]
      );
    };

    // 处理选择类型变化
    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value as '无监督学习' | '监督学习');
    };
  
    // 点击“开始测试”按钮，应用选择的模型和指标
    const handleTestStart = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      // if(!file){
      //   message.error("请先上传数据集")
      //   return;
      // }      

      const formData = new FormData();
      // formData.append('file', file);
      formData.append('dlModels', JSON.stringify(selectedDLModels));
      formData.append('mlModels', JSON.stringify(selectedMLModels));
      formData.append('metrics', JSON.stringify(sortMetrics(selectedMetrics)));
      formData.append('type', selectedType);

      const response = await dataTest(formData);
      console.log(response.data)

      setAppliedMetrics(sortMetrics(selectedMetrics))

      setChartData(response.data)

    // 模拟获取数据并更新图表
    //   fetchChartData().then(data => {
    //   console.log(selectedDLModels,selectedMLModels,sortMetrics(selectedMetrics),selectedType);
    //   setChartData(data);
    // });

    };

      // 模拟获取图表数据
  const fetchChartData = async (): Promise<DataTypes[]> => {
    return [
      { type: 'Model 1', data: [10, 20, 30, 40, 50] },
      { type: 'Deep Model 1', data: [15, 25, 35, 45, 55] },
    ];
  };

    // 上传数据集
    // const handleUploadData = (event: MouseEvent<HTMLButtonElement>) => {
    //   event.preventDefault();
    //   if (!file) {
    //     message.error("请先选择数据集")
    //     return;
    //   }
    //   else
    //   {
    //     message.success("上传成功~")
    //   }
    // };
  
    // 构建 ECharts 数据
    const getChartOptions = () => {
        const xAxisData = sortMetrics(appliedMetrics); // 只使用已应用的指标
        
        const allSelectedModels = chartData.map(item => item.type);// 只使用已选择的模型

        const seriesData = chartData
        .map((dataType) => ({
          name: dataType.type,
          type: 'line',
          data: dataType.data
        }));

        console.log(seriesData)
      
        // 确保只有当前选择的模型和指标出现在图表中
        return {
          title: {
            text: '模型性能对比',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: allSelectedModels, 
          },
          xAxis: {
            type: 'category',
            data: xAxisData, 
          },
          yAxis: {
            type: 'value',
          },
          series: seriesData, 
        };
    };
  
      return (
        <div className="container">
          {/* 上半部分：模型和指标选择 */}
          <div className="selection-section">
            {/* 第一行：机器学习模型选择 */}
            <div className="section-row">
              <label className="label">选择机器学习模型:</label>
              <div className="checkbox-group">
                {MLModels.map((model) => (
                  <div key={model}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedMLModels.includes(model)}
                        onChange={() => handleModelChange(model, setSelectedMLModels)}
                      />
                      <span>{model}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
      
            {/* 第二行：深度学习模型选择 */}
            <div className="section-row">
              <label className="label">选择深度学习模型:</label>
              <div className="checkbox-group">
                {DLModels.map((model) => (
                  <div key={model}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedDLModels.includes(model)}
                        onChange={() => handleModelChange(model, setSelectedDLModels)}
                      />
                      <span>{model}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* 新增行：选择类型 */}
            <div className="section-row">
              <label className="label">选择类型:</label>
              <select value={selectedType} onChange={handleTypeChange}>
                <option value="无监督学习">无监督学习</option>
                <option value="监督学习">监督学习</option>
              </select>
            </div>
            
            {/* 第三行：指标选择 */}
            <div className="section-row">
              <label className="label">选择指标:</label>
              <div className="checkbox-group">
                {Metrics.map((metric) => (
                  <div key={metric}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(metric)}
                        onChange={() => handleMetricChange(metric)}
                      />
                      <span>{metric}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
      
            {/* 按钮区域 */}
            <div className="button-group">
            {/* <label className="file-upload-label">
              <input type="file" accept=".arff" onChange={handleFileChange} />
              <span className="file-upload-text">选择数据集文件</span>
            </label> */}
              {/* <button className="upload-btn" onClick={handleUploadData}>上传数据集</button> */}
              <button className="test-btn" onClick={handleTestStart}>
                开始测试
              </button>
            </div>
          </div>
          {/* 下半部分：图表展示 */}
          <div className="chart-section">
            {appliedMetrics.length > 0 ? (
              <EChartsReact option={getChartOptions()} style={{ height: '450px' }} />
            ) : (
              <p className="no-metrics-text">请选择至少一个指标以查看图表</p>
            )}
          </div>
        </div>
      );
      
      
  };
  
  export default Data;