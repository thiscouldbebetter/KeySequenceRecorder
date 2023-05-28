
class Display
{
	constructor(size)
	{
		this.size = size;
	}

	initialize()
	{
		this.canvas = document.createElement("canvas");
		this.canvas.width = this.size.x;
		this.canvas.height = this.size.y;
		this.graphics = this.canvas.getContext("2d");
		var divDisplay = document.getElementById("divDisplay");
		divDisplay.appendChild(this.canvas);
	}

	// drawing

	clear()
	{
		this.graphics.fillStyle = "White";
		this.graphics.fillRect
		(
			0, 0, this.size.x, this.size.y
		);

		this.graphics.strokeStyle = "Gray";
		this.graphics.strokeRect
		(
			0, 0, this.size.x, this.size.y
		);
	}

	drawCircle(pos, radius, colorFill, colorBorder)
	{
		this.graphics.beginPath();
		this.graphics.arc(pos.x, pos.y, radius, 0, Math.PI * 2);

		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill;
			this.graphics.fill();
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.stroke();
		}
	}
	 
	drawLine(fromPos, toPos, color)
	{
		this.graphics.beginPath();
		this.graphics.moveTo(fromPos.x, fromPos.y);
		this.graphics.lineTo(toPos.x, toPos.y);
		this.graphics.strokeStyle = color;
		this.graphics.stroke();
	}

	drawRectangle(pos, size, colorFill, colorBorder)
	{
		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill;
			this.graphics.fillRect
			(
				pos.x, pos.y, size.x, size.y
			);
		}
		 
		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.strokeRect
			(
				pos.x, pos.y, size.x, size.y
			);
		}
	}

	drawText(text, pos, color)
	{
		this.graphics.fillStyle = color;
		this.graphics.fillText(text, pos.x, pos.y);
	}
}
