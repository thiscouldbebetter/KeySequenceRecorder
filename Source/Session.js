
class Session
{
	constructor(displaySize, pixelsPerSecond)
	{
		this.pixelsPerSecond = pixelsPerSecond;

		this.display = new Display(displaySize);
		this.display.initialize();
		this.display.clear();

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();

		this.status = SessionStatus.Instances().Stopped;

		this.millisecondsPerTimerTick = 50;
		this.numberOfTracksMax = 5;
		this.cursorOffsetInSeconds = 0;
	}

	static Instance()
	{
		if (Session._instance == null)
		{
			Session._instance = new Session
			(
				new Coords(500, 100), // displaySize
				100 // pixelsPerSecond
			);
		}

		return Session._instance;
	}

	play()
	{
		this.status = SessionStatus.Instances().Playing;
		this.timeStarted = new Date();
		this.timer = setInterval
		(
			this.play_Output.bind(this),
			this.millisecondsPerTimerTick
		);
	}

	play_Output(event)
	{
		var now = new Date();
		var cursorOffsetInMilliseconds = now - this.timeStarted;
		this.cursorOffsetInSeconds = cursorOffsetInMilliseconds / 1000;
		this.draw();
	}

	record()
	{
		this.status = SessionStatus.Instances().Recording;
		this.timeStarted = new Date();
		this.sequenceRecorded = new Sequence([]);

		this.timer = setInterval
		(
			this.record_Input.bind(this),
			this.millisecondsPerTimerTick
		);
	}

	record_Input()
	{
		var now = new Date();
		var offsetInMilliseconds = now - this.timeStarted;
		this.cursorOffsetInSeconds = offsetInMilliseconds / 1000;

		var tracks = this.sequenceRecorded.tracks;

		var inputsActive = this.inputHelper.inputsActive;
		for (var i = 0; i < inputsActive.length; i++)
		{
			var input = inputsActive[i];

			var trackForInput = tracks[input];
			if (trackForInput == null)
			{
				if (tracks.length < this.numberOfTracksMax)
				{
					trackForInput = new Track(input, []);
					tracks.push(trackForInput);
					tracks[input] = trackForInput;
				}
				else
				{
					continue;
				}
			}

			var event = new Event(this.cursorOffsetInSeconds, true);
			trackForInput.events.push(event);

			delete inputsActive[input];
			inputsActive.remove(input);
		}

		var inputsReleased = this.inputHelper.inputsReleased;
		for (var i = 0; i < inputsReleased.length; i++)
		{
			var input = inputsReleased[i];
			var trackForInput = tracks[input];

			if (trackForInput != null)
			{
				var event = new Event(this.cursorOffsetInSeconds, false);
				trackForInput.events.push(event);
			}

			inputsReleased.remove(input);
			delete inputsReleased[input];
		}

		this.draw();
	}

	stop()
	{
		this.status = SessionStatus.Instances().Stopped;
		if (this.timer != null)
		{
			clearInterval(this.timer);
		}
	}

	// drawing

	draw()
	{
		this.sequenceRecorded.draw
		(
			this.display, this.pixelsPerSecond, this.cursorOffsetInSeconds
		);
	}
}
