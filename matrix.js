function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < dataArray[0].length; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.textContent = dataArray[i][j];
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

function performOperation(operation) {
    let matrix1Rows = parseInt(document.getElementById('matrix1Rows').value);
    let matrix1Cols = parseInt(document.getElementById('matrix1Cols').value);
    let matrix2Rows = parseInt(document.getElementById('matrix2Rows').value);
    let matrix2Cols = parseInt(document.getElementById('matrix2Cols').value);


    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');

    console.log("1st Matrix", matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);

    let result;
    if (operation == 'add') {
        if (matrix1Rows != matrix2Rows || matrix1Cols != matrix2Cols) {
            console.log("Matrix addition is not possible. Matrices have different dimensions.");
            return;
        }
        result = addMatrices(matrix1, matrix2);
    } else if (operation == 'subtract') {
        if (matrix1Rows != matrix2Rows || matrix1Cols != matrix2Cols) {
            console.log("Matrix subtraction is not possible. Matrices have different dimensions.");
            return;
        }
        result = subtractMatrices(matrix1, matrix2);
    } else if (operation == 'multiply') {
        if (matrix1Cols != matrix2Rows) {
            console.log("Matrix multiplication is not possible. The number of columns in the first matrix must be equal to the number of rows in the second matrix.");
            return;
        }
        result = multiplyMatrices(matrix1, matrix2);
    } else {
        console.log("Invalid operation.");
        return;
    }

    if (result) {
        showResult2D('The Result', 'matrix3', result);
    }
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {

    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                matrixData.push(parseInt(inputs[index].value, 10));
            } else {
                matrixData.push(0); // Default value if input is missing
            }
        }
    }
    return matrixData;
};

// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2) {
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        let row = [];
        for (let j = 0; j < matrix1[0].length; j++) {
            row.push(matrix1[i][j] + matrix2[i][j]);
        }
        result.push(row);
    }
    return result;
}

const subtractMatrices = function(matrix1, matrix2) {

    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        let row = [];
        for (let j = 0; j < matrix1[0].length; j++) {
            row.push(matrix1[i][j] - matrix2[i][j]);
        }
        result.push(row);
    }
    return result;
};

const multiplyMatrices = (matrix1, matrix2) => {

    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result.push([]);
        for (let j = 0; j < matrix2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrix1[0].length; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i].push(sum);
        }
    }
    return result;
};