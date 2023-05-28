
class Sequence
{
	constructor(tracks)
	{
		this.tracks = tracks.addLookups("input");
	}

	draw(display, pixelsPerSecond, cursorOffsetInSeconds)
	{
		var secondsPerDisplay = display.size.x / pixelsPerSecond;
		var secondsPerDisplayHalf = secondsPerDisplay / 2;
		var viewOffsetMinInSeconds = cursorOffsetInSeconds - secondsPerDisplayHalf;
		var viewOffsetMaxInSeconds = viewOffsetMinInSeconds + secondsPerDisplay;
		 
		display.clear();
		 
		for (var t = 0; t < this.tracks.length; t++)
		{
			var track = this.tracks[t];
			var trackPosY =
			display.size.y / (this.tracks.length + 1) * (t + 1);
			track.draw
			(
				display,
				pixelsPerSecond,
				cursorOffsetInSeconds,
				viewOffsetMinInSeconds,
				viewOffsetMaxInSeconds,
				trackPosY
			);
		}

		if (viewOffsetMinInSeconds <= 0)
		{
			var eventDummy = new Event(0, null);
			var zeroPosX = eventDummy.draw_XPos
			(
				pixelsPerSecond, viewOffsetMinInSeconds
			);
			 
			display.drawLine
			(
				new Coords(zeroPosX, 0),
				new Coords(zeroPosX, display.size.y),
				"Gray"
			);
		}

		var cursorPosX = display.size.x / 2;
		display.drawLine
		(
			new Coords(cursorPosX, 0),
			new Coords(cursorPosX, display.size.y),
			"Gray"
		);
		 
		var cursorOffsetInMilliseconds = Math.round
		(
			cursorOffsetInSeconds * 1000
		);
		 
		display.drawText
		(
			"" + cursorOffsetInMilliseconds,
			new Coords(cursorPosX, display.size.y),
			"Gray"
		);
	}

	// serialization

	static deserialize(sequenceSerialized)
	{
		var tracksSerialized = sequenceSerialized.split("\n");
		var tracks = [];
		for (var i = 0; i < tracksSerialized.length; i++)
		{
			var trackSerialized = tracksSerialized[i];
			var track = Track.deserialize(trackSerialized);
			tracks.push(track);
		}

		var returnValue = new Sequence(tracks);
		return returnValue;
	}

	serialize()
	{
		var tracksSerialized = [];
		for (var i = 0; i < this.tracks.length; i++)
		{
			var track = this.tracks[i];
			var trackSerialized = track.serialize();
			tracksSerialized.push(trackSerialized);
		}

		var returnValue = tracksSerialized.join("\n");
		return returnValue;
	}
}
