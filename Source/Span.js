
class Span
{
	constructor(eventStart, eventStop)
	{
		this.eventStart = eventStart;
		this.eventStop = eventStop;
	}

	draw
	(
		display, pixelsPerSecond, viewOffsetMinInSeconds, trackPosY
	)
	{
		this.eventStart.draw
		(
			display, pixelsPerSecond, viewOffsetMinInSeconds, trackPosY
		);

		var xPosStart = this.eventStart.draw_XPos
		(
			pixelsPerSecond, viewOffsetMinInSeconds
		);
		var xPosStop = this.eventStop.draw_XPos
		(
			pixelsPerSecond, viewOffsetMinInSeconds
		);

		display.drawLine
		(
			new Coords(xPosStart, trackPosY),
			new Coords(xPosStop, trackPosY),
			"Gray"
		);

		this.eventStop.draw
		(
			display, pixelsPerSecond, viewOffsetMinInSeconds, trackPosY
		);
	}

	// serialization

	static deserialize(spanSerialized)
	{
		var parts = spanSerialized.split("-");
		var eventStart = new Event((parseFloat(parts[0]) / 1000), true);
		var eventStop = new Event((parseFloat(parts[1]) / 1000), false);
		var returnValue = new Span(eventStart, eventStop);
		return returnValue;
	}

	serialize()
	{
		var returnValue =
			this.eventStart.offsetInMilliseconds() + "-"
			+ this.eventStop.offsetInMilliseconds();
		return returnValue;
	}
}
