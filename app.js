function determinant(matrix)
{
	// matrix looks like this: [[a11, a12, a13], [a21, a22, a23], [a31, a32, a33]]
	if (matrix.length === 1)
	{
		return matrix[0][0];
	}
	
	if (matrix.length === 2)
	{
		return ((matrix[0][0]*matrix[1][1]) - matrix[1][0]*matrix[0][1]);
	}
	
	var det = 0;
	
	for (var i = 0; i < matrix.length; ++i)
	{
		var submatrix = [];
		for (var j = 1; j < matrix.length; ++j)
		{
			var row = matrix[j].slice();
			row.splice(i, 1)
			submatrix.push(row);
		}
		
		var sign = i % 2 === 0 ? 1 : -1;
		
		det += sign*matrix[0][i]*determinant(submatrix);
	}
	
	return det;
}



document.getElementById("incrementDimension").addEventListener("click", function()
{
	var matrix = document.getElementById("matrix");
	var input = document.createElement("input");
	input.type = "number";
	var td = document.createElement("td");
	var tr = document.createElement("tr");
	td.appendChild(input);
	tr.appendChild(td);
	matrix.children[0].appendChild(tr);
	
	for (var i = 0; i < matrix.rows.length; ++i)
	{
		while (matrix.rows[i].cells.length < matrix.rows.length)
		{
			var cell = matrix.rows[i].insertCell(-1);
			cell.innerHTML = "<input type='number'>";
		}
	}
});

var result = document.getElementById("result");
document.getElementById("calculateDeterminant").addEventListener("click", function()
{
	var matrixTable = document.getElementById("matrix");
	var matrix = [];
	
	for (var i = 0; i < matrixTable.rows.length; ++i)
	{
		var row = matrixTable.rows[i];
		var matrixRow = [];
		
		for (var j = 0; j < row.cells.length; ++j)
		{
			var cell = row.cells[j];
			var value = cell.children[0].value;
			matrixRow.push(parseInt(value));
		}
		matrix.push(matrixRow);
	}
	
	var det = determinant(matrix);
	
	
	result.innerHTML = "The determinant of your matrix is: " + det;
});