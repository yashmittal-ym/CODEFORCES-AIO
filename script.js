async function disp() {
			const username = document.getElementById('text1').value;
            const userApi = 'https://codeforces.com/api/user.info?handles=' + username;
            const response = await fetch(userApi);
            const data = await response.json();
            const error = data.status;
            if (error === "FAILED")  alert("Enter the valid handel!");
            const rating = data.result[0].rating;
            const rank = data.result[0].rank;
            const image = data.result[0].titlePhoto;
            const maxrating = data.result[0].maxRating;
            const dp=data.result[0].titlePhoto;
            document.getElementById('handle').textContent = username;
			document.getElementById('rank').textContent = rank;
			document.getElementById('rating').textContent = rating;
			document.getElementById('maxrating').textContent = maxrating;
            document.getElementById('image-id').src = dp;
    
            const userStatus = 'https://codeforces.com/api/user.status?handle=' + username;
            const response1 = await fetch(userStatus);
            const data1 = await response1.json();
            const resultLength = data1.result.length;
            
            var difficulty = new Array(28);
            for (let i = 0; i < 28; i++) difficulty[i] = 0;
            let AC = 0, WA = 0, TLE = 0, MLE = 0, RTE = 0, CE = 0;
            let mpIndex = new Map();
            let map = new Map();
            let mpTag = new Map();
            let mpLang = new Map();
            let mpUnsuc = new Map();
            let totalTried = 0;
            let totalTag = 0;
            let totalUnsolved = 0;
            for (let i = 0; i < resultLength; i++) {
                
                const temp = data1.result[i].verdict;
                const diff = data1.result[i].problem.rating;
                var val = parseInt(diff);
                let mpval = data1.result[i].problem.tags;
                let mpind = data1.result[i].problem.index;
                let mplan = data1.result[i].programmingLanguage;
                val = val - 800;
                val = val / 100;
                
                if (mpUnsuc.get(data1.result[i].problem.name) !== 1) mpUnsuc.set(data1.result[i].problem.name, 1);
                
                if (mpLang.has(mplan)) mpLang.set(mplan, mpLang.get(mplan) + 1);
                else mpLang.set(mplan, 1);
                
                if (temp === "OK" && map.get(data1.result[i].problem.name) !== 1) {
                    totalTried++;
                    const taglen = mpval.length;
                    for (let j = 0; j < taglen; j++) {
                        if (mpTag.has(mpval[j])) mpTag.set(mpval[j], mpTag.get(mpval[j]) + 1);
                        else mpTag.set(mpval[[j]], 1);
                        totalTag++;
                    }
                    
                    if (mpIndex.has(mpind)) mpIndex.set(mpind, mpIndex.get(mpind) + 1);
                    else mpIndex.set(mpind, 1);
                    
                    difficulty[val] = difficulty[val] + 1;
                    map.set(data1.result[i].problem.name, 1);
                }
                if (temp === "OK") AC++;
                if (temp === "WRONG_ANSWER") WA++;
                if (temp === "TIME_LIMIT_EXCEEDED") TLE++;
                if (temp === "MEMORY_LIMIT_EXCEEDED") MLE++;
                if (temp === "RUNTIME_ERROR") RTE++;
                if (temp === "COMPILATION_ERROR") CE++;
            }
            totalUnsolved=mpUnsuc.length-totalTrtied;
}
    