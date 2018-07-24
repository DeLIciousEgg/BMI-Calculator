(function(){
  const calc = document.querySelector('.calc');
  const reCalc = document.querySelector('.reCalc');
  //「看結果」後隱藏，顯示結果  
  function show(){
    calc.style.display = 'none';
    document.querySelector('.result').style.display = 'flex';
  }
  //改變 header 樣式與結果名稱
  function changeStyle(color, result){
    const num = document.querySelector('.result .bmi');
    const small = document.querySelector('.smallText');
    const cir = document.querySelector('.result .left');
    const bmiResult = document.querySelector('.bmiResult');
    num.style.color = color;
    small.style.color = color;
    reCalc.style.background = color;
    cir.style.border = `6px solid ${color}`;
    bmiResult.style.color = color;
    bmiResult.textContent = result; 
  }
  //顯示上面結果
  function headerResult(bmi, resultColor, resultTitle){
    const num = document.querySelector('.bmi');
    num.textContent = bmi;
    
    changeStyle(resultColor, resultTitle);
    show();
  }
  //計算BMI
  function bmiCalc(){
    const Weight = document.querySelector('#Weight').value;
    const Height = document.querySelector('#Height').value;
    if (Weight == '' || Height == ''){
      alert('身高或體重未輸入')
      return false;
    }
    else if (isNaN(Weight) || isNaN(Height)) {
      alert('身高與體重必須輸入數字')
      return false;
    } 
    else if (Weight <= 0 || Height <= 0) {
      alert('身高與體重必須是大於 0 的數字')
      return false;
    }
    //計算BMI
    let BMI = Weight / (Height * Height / 10000);
    //取BMI小數點兩位
    BMI = Math.round(BMI * 100) / 100;

    const resultColor = getResult(BMI).color;
    const resultTitle = getResult(BMI).title;
    const date = new Date();
    const dateTime = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    // 更新上面BMI
    headerResult(BMI, resultColor, resultTitle);
    
    //取得 localStorage，如果沒資料就空陣列
    let WH = JSON.parse(localStorage.getItem('WH')) || [];
    WH.push({
      Weight,
      Height,
      BMI,
      resultTitle,
      resultColor,
      dateTime,
    });
    WH = JSON.stringify(WH);
    //設定 localStorage
    localStorage['WH'] = WH;
    //更新紀錄
    getLocal();
    document.querySelector('#Weight').value = '';
    document.querySelector('#Height').value = '';
  }
  // 更新紀錄
  function getLocal(){
    let WH = JSON.parse(localStorage['WH']);

    let str = '';
    const record = document.querySelector('.record');
    for (let i = WH.length - 1; i >= 0  ; i--) {
      str += `
          <li style="border-left: 7px solid ${WH[i].resultColor}">
            <h3>${WH[i].resultTitle}</h3>
            <p>
              <small>BMI</small>
              <span class="bmi">${WH[i].BMI}</span>
            </p>
            <p>
              <small>Weight</small>
              <span class="weight">${WH[i].Weight}kg</span>
            </p>
            <p>
              <small>height</small>
              <span class="height">${WH[i].Height}cm</span>
            </p>
            <p>
              <small class="date">${WH[i].dateTime}</small>
            </p>
          </li>`;
    }
    record.innerHTML = str;
  }
  //BMI取得結果(顏色、標題)
  function getResult(bmi){
    if (bmi < 18.5)
      return {
        color: '#31BAF9',
        title: '過輕'
      };
    else if (bmi >= 18.5 && bmi < 24)
      return {
        color: '#86D73F',
        title: '理想'
    };
    else if (bmi >= 24 && bmi < 27)
      return {
        color: '#FF982D',
        title: '過重'
      };
    else if (bmi >= 27 && bmi < 30)
      return {
        color: '#FF6C03',
        title: '輕度肥胖'
      };
    else if (bmi >= 30 && bmi < 35)
      return {
        color: '#FF6C03',
        title: '中度肥胖'
      };
    else if (bmi >= 35)
      return {
        color: '#FF1200',
        title: '重度肥胖'
      };
  }
  //看結果點擊事件
  calc.addEventListener('click', bmiCalc);
  reCalc.addEventListener('click', bmiCalc);
  getLocal();


})();