
class InputHelper
{
	constructor()
	{
		this.inputsPressed = [];
		this.inputsActive = [];
		this.inputsReleased = [];
	}

	initialize()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	// events

	handleEventKeyDown(event)
	{
		var input = event.key;

		if (this.inputsPressed[input] == null)
		{
			this.inputsPressed.push(input);
			this.inputsPressed[input] = input;

			this.inputsActive.push(input);
			this.inputsActive[input] = input;
		}
	}

	handleEventKeyUp(event)
	{
		var input = event.key;
		if (this.inputsPressed[input] != null)
		{
			this.inputsPressed.remove(input);
			delete this.inputsPressed[input];

			this.inputsActive.remove(input);
			delete this.inputsActive[input];

			this.inputsReleased.push(input);
			this.inputsReleased[input] = input;
		}
	}
}
