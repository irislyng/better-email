


function loadTestData() {
	var d_item1 = {
			"id": 1,
			"name": "Test Sender",
			"subject": "Test Email",
			"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a nulla sit amet dui ullamcorper tincidunt. Praesent et laoreet urna. Suspendisse gravida nisi diam, vel malesuada magna dictum vitae. Donec mollis ipsum consectetur arcu euismod scelerisque. Fusce elit ipsum, efficitur ut tempor ut, facilisis quis nisi. Suspendisse ligula ante, lobortis vitae dignissim in, euismod at libero. Cras imperdiet tempus augue, eget mollis turpis hendrerit sit amet. In vitae odio varius, luctus justo in, pellentesque justo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam nec nisi rutrum, dictum diam eu, luctus diam. Phasellus vehicula fringilla scelerisque. Cras euismod purus nec ullamcorper pharetra. Nunc ac gravida massa, pulvinar luctus neque. Vestibulum hendrerit urna quis ligula finibus, pharetra posuere purus accumsan. Nulla facilisi.",
			"datetime": "Dec 12, 2016 12:09AM",
			"to": "sender@sender.com",
			"from": "sender@sender.com"
		};
		var d_item2 = {
			"id": 2,
			"name": "Shit",
			"subject": "Test Email",
			"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a nulla sit amet dui ullamcorper tincidunt. Praesent et laoreet urna. Suspendisse gravida nisi diam, vel malesuada magna dictum vitae. Donec mollis ipsum consectetur arcu euismod scelerisque. Fusce elit ipsum, efficitur ut tempor ut, facilisis quis nisi. Suspendisse ligula ante, lobortis vitae dignissim in, euismod at libero. Cras imperdiet tempus augue, eget mollis turpis hendrerit sit amet. In vitae odio varius, luctus justo in, pellentesque justo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam nec nisi rutrum, dictum diam eu, luctus diam. Phasellus vehicula fringilla scelerisque. Cras euismod purus nec ullamcorper pharetra. Nunc ac gravida massa, pulvinar luctus neque. Vestibulum hendrerit urna quis ligula finibus, pharetra posuere purus accumsan. Nulla facilisi.",
			"datetime": "Dec 12, 2016 12:09AM",
			"to": "sender@sender.com",
			"from": "sender@sender.com"
		}

		localStorage.setItem("email_data", JSON.stringify([d_item1, d_item2]));
}


loadTestData();