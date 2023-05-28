
class Track
{
	constructor(input, events)
	{
		this.input = input;
		this.events = events;
	}

	// drawing

	draw
	(
		display,
		pixelsPerSecond,
		cursorOffsetInSeconds,
		viewOffsetMinInSeconds,
		viewOffsetMaxInSeconds,
		yPos
	)
	{
		display.drawLine
		(
			new Coords(0, yPos),
			new Coords(display.size.x, yPos),
			"LightGray"
		);

		display.drawText
		(
			this.input, new Coords(0, yPos), "Gray"
		);

		var eventPrev = null;

		for (var i = 0; i < this.events.length; i++)
		{
			var event = this.events[i];
			if (event.offsetInSeconds >= viewOffsetMinInSeconds)
			{
				if (event.offsetInSeconds >= viewOffsetMaxInSeconds)
				{
					break;
				}
				else
				{
					var span = null;
					if (event.isPressNotRelease)
					{
						var eventNext = this.events[i + 1];
						if (eventNext == null)
						{
							var eventDummy = new Event
							(
								cursorOffsetInSeconds, false
							);
							span = new Span(event, eventDummy)
						}
						else
						{
							span = new Span(event, eventNext);
						}
					}
					else if (eventPrev != null)
					{
						span = new Span(eventPrev, event);
					}

					if (span != null)
					{
						span.draw(display, pixelsPerSecond, viewOffsetMinInSeconds, yPos);
					}
				}
			}

			eventPrev = event;

		} // end for each event
	}

	// serialization

	static deserialize(trackSerialized)
	{
		var parts = trackSerialized.split("=");
		var input = parts[0];
		var spansSerialized = parts[1].split(",");
		var events = [];
		for (var i = 0; i < spansSerialized.length; i++)
		{
			var spanSerialized = spansSerialized[i];
			var span = Span.deserialize(spanSerialized);
			events.push(span.eventStart);
			events.push(span.eventStop);
		}

		var returnValue = new Track(input, events);
		return returnValue;
	}

	serialize()
	{
		var spansSerialized = [];
		for (var e = 0; e < this.events.length; e += 2)
		{
			var eventStart = this.events[e];
			var eventStop = this.events[e + 1];
			var span = new Span(eventStart, eventStop);
			var spanSerialized = span.serialize();
			spansSerialized.push(spanSerialized);
		}

		var returnValue =
			this.input + "=" + spansSerialized.join(",");
			return returnValue;
	}
}
