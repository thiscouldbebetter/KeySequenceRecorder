
class SessionStatus
{
	constructor(name)
	{
		this.name = name;
	}

	static Instances()
	{
		if (SessionStatus._instances == null)
		{
			SessionStatus._instances = new SessionStatus_Instances();
		}
		return SessionStatus._instances;
	}
}

class SessionStatus_Instances
{
	constructor()
	{
		this.Playing = new SessionStatus("Playing");
		this.Recording = new SessionStatus("Recording");
		this.Stopped = new SessionStatus("Stopped");
	}
}

