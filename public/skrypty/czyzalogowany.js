//Schowaj/Pokaż przyciski w zależności od zalogowania
				// Get the userId cookie
				let userIdCookie = document.cookie.split('; ').find(row => row.startsWith('userId'));

				let userId = userIdCookie ? userIdCookie.split('=')[1] : null;
				// Get references to the buttons
				const loginButton = document.getElementById('menu-item-11789');
				const registerButton = document.getElementById('menu-item-11790');
				const profileButton = document.getElementById('menu-item-11791');

				if (userId && userId.length > 0) {
					// User is logged in
					// Hide the login and register buttons, and show the profile button
					loginButton.style.display = 'none';
					registerButton.style.display = 'none';
					profileButton.style.display = 'inline-block';
				} else {
					// User is not logged in
					// Show the login and register buttons, and hide the profile button
					loginButton.style.display = 'inline-block';
					registerButton.style.display = 'inline-block';
					profileButton.style.display = 'none';
				}