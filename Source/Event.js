
class Event
{
	constructor(offsetInSeconds, isPressNotRelease)
	{
		this.offsetInSeconds = offsetInSeconds;
		this.isPressNotRelease = isPressNotRelease;
	}

	offsetInMilliseconds()
	{
		return Math.round(this.offsetInSeconds * 1000);
	}

	// drawable

	static MarkerRadius = 3;
	static MarkerSize = new Coords(5, 5);

	draw(display, pixelsPerSecond, viewOffsetInSecondsMin, yPos)
	{
		var xPos = this.draw_XPos(pixelsPerSecond, viewOffsetInSecondsMin);
		var drawPos = new Coords(xPos, yPos);

		if (this.isPressNotRelease == true)
		{
			display.drawCircle(drawPos, Event.MarkerRadius, null, "Gray");
		}
		else
		{
			var markerSize = Event.MarkerSize;
			drawPos.x -= markerSize.x / 2;
			drawPos.y -= markerSize.x / 2;
			display.drawRectangle(drawPos, markerSize, null, "Gray");
		}
	}

	draw_XPos(pixelsPerSecond, viewOffsetInSecondsMin)
	{
		var returnValue =
			(this.offsetInSeconds - viewOffsetInSecondsMin)
			* pixelsPerSecond;

		return returnValue;
	}
}
