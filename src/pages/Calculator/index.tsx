import { useState } from 'react';
import './style.scss'

const Calculator = () => {
  // Helper function để xác định kích thước chữ dựa vào độ dài
  const getTextSizeClass = (text: string, isResult: boolean) => {
    const length = text.length;
    
    if (isResult) {
      // Quy tắc cho phần result
      if (length > 12) return 'small-text';
      if (length > 8) return 'medium-text';
      return '';
    } else {
      // Quy tắc cho phần calculation
      if (length > 20) return 'small-text';
      if (length > 15) return 'medium-text';
      return '';
    }
  };

  const [numbersInput, setNumbersInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const endWithSign = (input: string) => {
    return input.endsWith('+') || input.endsWith('-') || input.endsWith('x') || input.endsWith('÷');
  }

  // Thêm hàm toggleLastNumberSign để xử lý đổi dấu số cuối cùng
  const toggleLastNumberSign = (input: string): string => {
    // Nếu chuỗi rỗng, không làm gì
    if (!input) return input;

    // Nếu chuỗi kết thúc với phép toán, không làm gì
    if (endWithSign(input)) return input;

    // Tìm vị trí của phép toán cuối cùng
    const lastOperatorIndex = Math.max(
      input.lastIndexOf('+'),
      input.lastIndexOf('-'),
      input.lastIndexOf('x'),
      input.lastIndexOf('÷')
    );

    // Xác định số cuối cùng
    const lastPart = lastOperatorIndex >= 0 ? input.substring(lastOperatorIndex + 1) : input;
    const firstPart = lastOperatorIndex >= 0 ? input.substring(0, lastOperatorIndex + 1) : '';
    
    // Làm sạch hoàn toàn số, loại bỏ hết các dấu ngoặc lồng nhau
    let cleanNumber = lastPart;
    
    // Đếm số lần đổi dấu
      return firstPart + '(-' + cleanNumber + ')';
  };

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setNumbersInput('');
      setResult('');
    } else if (value === '=') {
      const calculatedResult = calculateResult(numbersInput);
      setResult(numbersInput);
      setNumbersInput(calculatedResult);
    } else if (value === '←') {
      setNumbersInput(prev => prev.slice(0, -1));
      setResult('');
    } else {
      if (result) {
        if (value === "-  " || value === "+" || value === "x" || value === "÷" || value === "%") {
          setNumbersInput(numbersInput + value);
          setResult('');
        } else if (value === "±") {
          // Đổi dấu của kết quả trước đó
          setNumbersInput(toggleLastNumberSign(numbersInput));
          setResult('');
        } else {
          setNumbersInput(value); // Thay thế kết quả với giá trị mới
          setResult('');
        }
      } else if (!result && numbersInput) {
        if (endWithSign(numbersInput) && (value === "+" || value === "-" || value === "x" || value === "÷")) {
          setNumbersInput(prev => prev.slice(0, -1) + value);
        } else if (endWithSign(numbersInput) && (value === "%" || value === "±")) {
          return;
        } else if (value === "±") {
          // Đổi dấu số cuối cùng trong biểu thức
          setNumbersInput(toggleLastNumberSign(numbersInput));
        } else {
          setNumbersInput(prev => prev + value);
        }
      } else {
        if (value === "±") {
          return; // Không làm gì nếu chưa có số
        } else {
          setNumbersInput(prev => prev + value);
        }
      }
    }
  }

  const calculateResult = (input: string) => {
  try {
    // Simple evaluation of the input string
    const evalResult = eval(input.replace(/x/g, '*').replace(/÷/g, '/').replace(/%/g, '/100'));
    return evalResult.toString();
  } catch (error) {
    return 'Error';
  }
  }

  return (
    <div className = "calculator">
      <div className = "calculator-header">
        <div className = "calculator-header-bigtext">Calculator</div>
        <div className = "calculator-header-smalltext">Basically calculator</div>
      </div>
      <div className = "calculator-body">
        <div className = "calculator-frame">
          <div className = "calculator-screen">
            <div className = {`calculator-screen-calculation ${getTextSizeClass(result, false)}`}>
              {result}
            </div>
            <div className = {`calculator-screen-result ${getTextSizeClass(numbersInput, true)}`}>
              {numbersInput}
            </div>
          </div>
          <div className = "calculator-buttons">
            <div className = "calculator-buttons-row-1 row">
              <div className = "calculator-button calculator-button-backspace" onClick={() => handleButtonClick('←')}>←</div>
              <div className = "calculator-button calculator-button-clear" onClick={() => handleButtonClick('C')}>C</div>
              <div className = "calculator-button calculator-button-percent" onClick={() => handleButtonClick('%')}>%</div>
              <div className = "calculator-button calculator-button-division" onClick={() => handleButtonClick('÷')}>÷</div>
            </div>
            <div className = "calculator-buttons-row-2 row">
              <div className = "calculator-button calculator-button-7" onClick={() => handleButtonClick('7')}>7</div>
              <div className = "calculator-button calculator-button-8" onClick={() => handleButtonClick('8')}>8</div>
              <div className = "calculator-button calculator-button-9" onClick={() => handleButtonClick('9')}>9</div>
              <div className = "calculator-button calculator-button-multiplication" onClick={() => handleButtonClick('x')}>x</div>
            </div>
            <div className = "calculator-buttons-row-3 row">
              <div className = "calculator-button calculator-button-4" onClick={() => handleButtonClick('4')}>4</div>
              <div className = "calculator-button calculator-button-5" onClick={() => handleButtonClick('5')}>5</div>
              <div className = "calculator-button calculator-button-6" onClick={() => handleButtonClick('6')}>6</div>
              <div className = "calculator-button calculator-button-subtraction" onClick={() => handleButtonClick('-')}>-</div>
            </div>
            <div className = "calculator-buttons-row-4 row">
              <div className = "calculator-button calculator-button-1" onClick={() => handleButtonClick('1')}>1</div>
              <div className = "calculator-button calculator-button-2" onClick={() => handleButtonClick('2')}>2</div>
              <div className = "calculator-button calculator-button-3" onClick={() => handleButtonClick('3')}>3</div>
              <div className = "calculator-button calculator-button-addition" onClick={() => handleButtonClick('+')}>+</div>
            </div>
            <div className = "calculator-buttons-row-5 row">
              <div className = "calculator-button calculator-button-decimal" onClick={() => handleButtonClick('.')}>.</div>
              <div className = "calculator-button calculator-button-0" onClick={() => handleButtonClick('0')}>0</div>
              <div className = "calculator-button calculator-button-sign" onClick={() => handleButtonClick('±')}>±</div>
              <div className = "calculator-button calculator-button-equals" onClick={() => handleButtonClick('=')}>=</div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator