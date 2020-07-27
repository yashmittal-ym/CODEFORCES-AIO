async function disp() {
			const x = document.getElementById('text1').value;
			const y = 'https://codeforces.com/api/user.info?handles=' + x;
			const response = await fetch(y);
			const data = await response.json();
			
			const object = data.result;
			for (var property in object) {
    			alert('item ' + i + ': ' + property + '=' + object[property]);
  			}	
		}